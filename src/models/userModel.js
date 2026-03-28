const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ /* ... */ });

// Middleware: Tự động băm mật khẩu trước khi lưu
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);