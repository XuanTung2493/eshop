const Order = require('../models/orderModel');

const calculateTotalAmount = (products) => {
  return products.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const sampleOrders = [
  {
    orderid: 1,
    products: [
      {
        product_id: 'quanau',
        product_name: 'quan au',
        size: 'XL',
        price: 10,
        quantity: 1,
      },
      {
        product_id: 'somi',
        product_name: 'ao so mi',
        size: 'XL',
        price: 10.5,
        quantity: 2,
      },
    ],
    delivery_address: 'Hanoi',
  },
  {
    orderid: 2,
    products: [
      {
        product_id: 'somi',
        product_name: 'ao so mi',
        size: 'L',
        price: 10.5,
        quantity: 1,
      },
    ],
    delivery_address: 'Da Nang',
  },
];

exports.insertSampleOrders = async () => {
  const preparedOrders = sampleOrders.map((order) => ({
    ...order,
    total_amount: calculateTotalAmount(order.products),
  }));

  const results = [];

  for (const order of preparedOrders) {
    const saved = await Order.findOneAndUpdate(
      { orderid: order.orderid },
      order,
      { new: true, upsert: true, runValidators: true }
    );
    results.push(saved);
  }

  return results;
};

exports.getAllOrders = async () => {
  return await Order.find().sort({ orderid: 1 });
};

exports.updateDeliveryAddress = async (orderid, newAddress) => {
  return await Order.findOneAndUpdate(
    { orderid: Number(orderid) },
    { delivery_address: newAddress },
    { new: true, runValidators: true }
  );
};

exports.removeOrder = async (orderid) => {
  return await Order.findOneAndDelete({ orderid: Number(orderid) });
};

exports.calculateOrderTotal = async (orderid) => {
  const order = await Order.findOne({ orderid: Number(orderid) });

  if (!order) throw new Error('Order not found');

  const total = calculateTotalAmount(order.products);
  order.total_amount = total;
  await order.save();

  return {
    orderid: order.orderid,
    total_amount: total,
  };
};

exports.countProductIdSomi = async () => {
  const orders = await Order.find();
  let count = 0;

  for (const order of orders) {
    for (const product of order.products) {
      if (product.product_id === 'somi') count++;
    }
  }

  return count;
};