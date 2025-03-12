const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');

// 🔹 Obtener todos los empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al obtener empleados' });
  }
});

// 🔹 Obtener un empleado por ID
router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al buscar empleado' });
  }
});

// 🔹 Crear un nuevo empleado
router.post('/', async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    await nuevoEmpleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al agregar empleado' });
  }
});

// 🔹 Actualizar un empleado por ID
router.put('/:id', async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empleadoActualizado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(empleadoActualizado);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al actualizar empleado' });
  }
});

// 🔹 Eliminar un empleado por ID
router.delete('/:id', async (req, res) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ message: '✅ Empleado eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error al eliminar empleado' });
  }
});

module.exports = router;
