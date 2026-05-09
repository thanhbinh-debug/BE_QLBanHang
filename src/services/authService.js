const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const login = async (username, password) => {
  const user = await User.findOne({ where: { username, isActive: true } });
  if (!user) throw new Error("Tài khoản không tồn tại");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Sai mật khẩu");

  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return { token, user: { id: user.id, name: user.name, role: user.role } };
};

// Hàm đăng ký mới cho bạn
// const register = async (userData) => {
//   const { username, password, name, email, role } = userData;

//   // 1. Kiểm tra xem username đã tồn tại chưa
//   const existingUser = await User.findOne({ where: { username } });
//   if (existingUser) throw new Error("Tên đăng nhập đã tồn tại");

//   // 2. Mã hóa mật khẩu
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // 3. Tạo user mới trong database
//   const newUser = await User.create({
//     username,
//     password: hashedPassword,
//     name,
//     email,
//     role: role || "user", // Mặc định là 'user' nếu bạn không gửi role lên
//     isActive: true,
//   });

//   return {
//     id: newUser.id,
//     username: newUser.username,
//     name: newUser.name,
//   };
// };

const register = async ({ name, username, password }) => {
  // Check username taken
  const exists = await User.findOne({ where: { username } });
  if (exists) throw new Error("Username đã tồn tại");

  const hashed = await bcrypt.hash(password, 10);

  // New accounts always start as 'cashier' — role can be upgraded by admin later
  const user = await User.create({
    name,
    username,
    password: hashed,
    role: "user",
  });

  return { id: user.id, name: user.name, role: user.role };
};

module.exports = { login, register };
