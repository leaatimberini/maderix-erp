const express = require('express');
const router = express.Router();

// Datos de ejemplo (debería venir de la base de datos)
router.get('/stats', (req, res) => {
  res.json({
    empleados: 45,
    stock: 120,
    ventas: 300000,
    produccion: 520
  });
});

router.get('/chart-data', (req, res) => {
  res.json([
    { fecha: "Lunes", produccion: 100 },
    { fecha: "Martes", produccion: 120 },
    { fecha: "Miércoles", produccion: 130 },
    { fecha: "Jueves", produccion: 110 },
    { fecha: "Viernes", produccion: 140 }
  ]);
});

module.exports = router;
