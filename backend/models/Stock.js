const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  warehouse: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Stock', StockSchema);
