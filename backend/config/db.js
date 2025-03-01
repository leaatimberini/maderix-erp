const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Atlas conectado correctamente');
  } catch (err) {
    console.error('❌ Error en la conexión a MongoDB Atlas:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
