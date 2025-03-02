require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const deleteAdmin = async () => {
  try {
    await connectDB();

    const email = "leandrotimberini@gmail.com";
    const result = await User.deleteOne({ email });

    if (result.deletedCount > 0) {
      console.log(`✅ Usuario administrador con email ${email} eliminado.`);
    } else {
      console.log(`⚠️ No se encontró un usuario con email ${email}.`);
    }

    process.exit();
  } catch (error) {
    console.error("❌ Error al eliminar el usuario administrador:", error);
    process.exit(1);
  }
};

deleteAdmin();
