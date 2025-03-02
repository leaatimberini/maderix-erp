const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    console.log("📥 Recibiendo solicitud de registro:", req.body);

    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      console.log("⚠️ Usuario ya existe:", email);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hash, role });
    await user.save();

    console.log("✅ Usuario registrado correctamente:", email);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error("❌ Error en el registro:", err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    console.log("📥 Solicitud recibida en /login:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("⚠️ Usuario no encontrado:", email);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    console.log("🔍 Contraseña en la base de datos:", user.password);
    console.log("🔍 Contraseña ingresada (sin encriptar):", password);

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("❌ Contraseña incorrecta para:", email);
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("✅ Usuario autenticado correctamente:", email);
    res.json({ token });
  } catch (err) {
    console.error("❌ Error en el login:", err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// Enviar correo de recuperación
router.post('/forgot-password', async (req, res) => {
  try {
    console.log("📥 Solicitud recibida en /forgot-password:", req.body);

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("⚠️ Usuario no encontrado:", email);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de Contraseña - Maderix ERP',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:3000/reset-password/${token}`
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Correo de recuperación enviado a:", email);
    res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (err) {
    console.error("❌ Error en forgot-password:", err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Restablecer contraseña
router.post('/reset-password', async (req, res) => {
  try {
    console.log("📥 Solicitud recibida en /reset-password:", req.body);

    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("⚠️ Token inválido");
      return res.status(400).json({ message: 'Token inválido' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    console.log("✅ Contraseña restablecida para:", user.email);
    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (err) {
    console.error("❌ Error en reset-password:", err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
