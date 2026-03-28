const User = require('../models/userModel');

exports.registerUser = async (userData) => {
  // Logic nghiệp vụ: Kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email này đã được sử dụng');
  }
  
  // Lưu vào DB (Schema Middleware sẽ tự mã hóa mật khẩu)
  const user = new User(userData);
  return await user.save();
};