require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

const createAdmin = async () => {
  try {
    await connectDB();

    const email = "leandrotimberini@gmail.com";
    const password = "Nachito29";
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️ El usuario administrador ya existe.");
      process.exit(1);
    }

    const admin = new User({
      name: "Administrador",
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("✅ Usuario administrador creado con éxito.");
    process.exit();
  } catch (error) {
    console.error("❌ Error al crear el usuario administrador:", error);
    process.exit(1);
  }
};

createAdmin();
