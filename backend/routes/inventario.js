const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// 🔹 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al obtener productos' });
  }
});

// 🔹 Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al buscar producto' });
  }
});

// 🔹 Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al agregar producto' });
  }
});

// 🔹 Actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!productoActualizado) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(productoActualizado);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al actualizar producto' });
  }
});

// 🔹 Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: '✅ Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error al eliminar producto' });
  }
});

module.exports = router;
