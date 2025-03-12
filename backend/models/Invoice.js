const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  items: [{ type: String, required: true }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'canceled'], default: 'pending' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
