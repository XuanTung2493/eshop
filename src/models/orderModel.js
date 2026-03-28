const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      trim: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderid: {
      type: Number,
      required: true,
      unique: true,
    },
    products: {
      type: [productSchema],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'Products must not be empty',
      },
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    delivery_address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'OrderCollection',
  }
);

module.exports = mongoose.model('Order', orderSchema);