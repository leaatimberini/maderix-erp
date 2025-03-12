const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  activo: { type: Boolean, default: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: false },
  fechaIngreso: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
