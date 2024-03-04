const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema({
  googleId: { type: String, required: true },
  items: [orderItemSchema],
});

module.exports = mongoose.model('Order', orderSchema);
