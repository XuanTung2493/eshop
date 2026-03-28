const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderid: { type: Number, required: true, unique: true },
    products: [{
        product_id: { type: String, required: true },
        product_name: { type: String, required: true },
        size: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    total_amount: { type: Number, required: true },
    delivery_address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);