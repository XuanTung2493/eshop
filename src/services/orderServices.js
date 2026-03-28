const Order = require('../models/orderModel'); // Đảm bảo model đã sửa như tôi hướng dẫn trước đó

exports.seedOrders = async () => {
    const sampleOrders = [
        {
            orderid: 1,
            products: [
                { product_id: "quanau", product_name: "quan au", size: "XL", price: 10, quantity: 1 },
                { product_id: "somi", product_name: "ao so mi", size: "XL", price: 10.5, quantity: 2 }
            ],
            total_amount: 31,
            delivery_address: "Hanoi"
        },
        {
            orderid: 2,
            products: [{ product_id: "somi", product_name: "ao so mi", size: "L", price: 10.5, quantity: 1 }],
            total_amount: 10.5,
            delivery_address: "HCM"
        }
    ];

    return await Order.insertMany(sampleOrders);
};
exports.updateAddress = async (orderId, newAddress) => {
    return await Order.updateOne(
        { orderid: orderId },
        { $set: { delivery_address: newAddress } }
    );
};
exports.deleteOrder = async (orderId) => {
    return await Order.deleteOne({ orderid: orderId });
};
exports.printOrderTable = async () => {
    const orders = await Order.find();
    console.log("No | Product name | Price | Quantity | Total");
    let count = 1;
    orders.forEach(order => {
        order.products.forEach(p => {
            console.log(`${count++} | ${p.product_name} | ${p.price} | ${p.quantity} | ${p.price * p.quantity}`);
        });
    });
};
exports.calculateGrandTotal = async () => {
    const result = await Order.aggregate([
        { $group: { _id: null, grandTotal: { $sum: "$total_amount" } } }
    ]);
    return result.length > 0 ? result[0].grandTotal : 0;
};
exports.countSomiProducts = async () => {
    const orders = await Order.find({ "products.product_id": "somi" });
    let totalSomi = 0;
    orders.forEach(order => {
        order.products.forEach(p => {
            if(p.product_id === "somi") totalSomi += p.quantity;
        });
    });
    console.log("Total 'somi' products:", totalSomi);
    return totalSomi;
};
