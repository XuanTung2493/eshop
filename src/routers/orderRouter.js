const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Web UI
router.get('/', orderController.renderOrdersPage);
router.post('/insert-sample', orderController.insertOrdersWeb);
router.post('/:orderid/address', orderController.editDeliveryAddressWeb);
router.get('/:orderid/delete', orderController.deleteOrderWeb);

// API phụ trợ hiển thị trên web
router.get('/:orderid/total', orderController.calculateTotalAmount);
router.get('/stats/count-somi', orderController.countSomiProduct);

module.exports = router;