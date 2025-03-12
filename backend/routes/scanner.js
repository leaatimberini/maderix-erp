const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ScannedDocument = mongoose.model('ScannedDocument', new mongoose.Schema({
  codigo: String,
  fecha: { type: Date, default: Date.now }
}));

router.post('/process', async (req, res) => {
  try {
    const { codigo } = req.body;
    if (!codigo) return res.status(400).json({ message: 'Código no válido' });

    const documento = new ScannedDocument({ codigo });
    await documento.save();

    res.json({ message: 'Código procesado correctamente' });
  } catch (err) {
    console.error("❌ Error al procesar el código:", err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const documentos = await ScannedDocument.find().sort({ fecha: -1 });
    res.json(documentos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el historial' });
  }
});

module.exports = router;
