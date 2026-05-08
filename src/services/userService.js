const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { getPagination } = require("../utils/pagination");

// Lấy danh sách nhân viên (có phân trang)
const getAll = async (query) => {
  const { limit, offset, page } = getPagination(query);
  const result = await User.findAndCountAll({
    attributes: { exclude: ["password"] }, // không trả password ra ngoài
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return { ...result, page, limit };
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) throw new Error("Không tìm thấy nhân viên");
  return user;
};

const create = async (data) => {
  const exists = await User.findOne({ where: { username: data.username } });
  if (exists) throw new Error("Username đã tồn tại");
  data.password = await bcrypt.hash(data.password, 10); // mã hóa mật khẩu
  return User.create(data);
};

const update = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Không tìm thấy nhân viên");
  if (data.password) data.password = await bcrypt.hash(data.password, 10);
  return user.update(data);
};

// Xóa mềm — chỉ tắt isActive, không xóa khỏi DB
const remove = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Không tìm thấy nhân viên");
  return user.update({ isActive: false });
};

module.exports = { getAll, getById, create, update, remove };
