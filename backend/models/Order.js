const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  items: [{ type: String, required: true }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
