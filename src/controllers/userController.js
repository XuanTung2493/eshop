const userService = require('../services/userService');

exports.register = async (req, res, next) => {
  try {
    // 1. Lấy dữ liệu từ Request
    const userData = req.body;

    // 2. Gọi Service xử lý
    const newUser = await userService.registerUser(userData);

    // 3. Phản hồi kết quả
    res.status(201).render('auth/success', { user: newUser });
  } catch (error) {
    // Chuyển lỗi sang Middleware xử lý lỗi tập trung
    next(error);
  }
};