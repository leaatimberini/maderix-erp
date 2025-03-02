const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');  // Modelo de órdenes de producción
const Stock = require('../models/Stock');  // Modelo de stock
const Invoice = require('../models/Invoice'); // Modelo de facturación

router.get('/stats', async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments();
    const totalOrders = await Order.countDocuments({ status: 'en_proceso' });
    const totalStock = await Stock.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]);
    const totalRevenue = await Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);

    res.json({
      totalEmployees,
      totalOrders,
      totalStock: totalStock.length > 0 ? totalStock[0].total : 0,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
    });
  } catch (err) {
    console.error("❌ Error en el dashboard:", err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
