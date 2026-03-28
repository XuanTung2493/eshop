const orderService = require('../services/orderService');

exports.renderOrdersPage = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    const somiCount = await orderService.countProductIdSomi();

    res.render('orders', {
      message: null,
      orders,
      somiCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.insertOrdersWeb = async (req, res, next) => {
  try {
    await orderService.insertSampleOrders();
    res.redirect('/orders');
  } catch (error) {
    next(error);
  }
};

exports.editDeliveryAddressWeb = async (req, res, next) => {
  try {
    const { orderid } = req.params;
    const { delivery_address } = req.body;

    await orderService.updateDeliveryAddress(orderid, delivery_address);
    res.redirect('/orders');
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderWeb = async (req, res, next) => {
  try {
    const { orderid } = req.params;
    await orderService.removeOrder(orderid);
    res.redirect('/orders');
  } catch (error) {
    next(error);
  }
};

exports.calculateTotalAmount = async (req, res, next) => {
  try {
    const { orderid } = req.params;
    const result = await orderService.calculateOrderTotal(orderid);

    res.status(200).json({
      message: 'Calculate total amount successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.countSomiProduct = async (req, res, next) => {
  try {
    const count = await orderService.countProductIdSomi();

    res.status(200).json({
      message: 'Count product_id = somi successfully',
      total_somi_product_id: count,
    });
  } catch (error) {
    next(error);
  }
};