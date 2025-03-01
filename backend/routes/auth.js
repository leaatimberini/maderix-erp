router.post('/login', async (req, res) => {
  try {
    console.log("📥 Solicitud recibida en /login:", req.body); // Log para ver qué datos llegan

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("⚠️ Usuario no encontrado:", email);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("⚠️ Contraseña incorrecta para:", email);
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
