const { Op } = require("sequelize");
const { Customer } = require("../models");
const { getPagination } = require("../utils/pagination");

const getAll = async (query) => {
  const { limit, offset, page } = getPagination(query);
  const where = { isActive: true };
  if (query.search)
    where[Op.or] = [
      { name: { [Op.like]: `%${query.search}%` } },
      { phone: { [Op.like]: `%${query.search}%` } },
    ];
  const result = await Customer.findAndCountAll({ where, limit, offset });
  return { ...result, page, limit };
};

const getById = async (id) => {
  const c = await Customer.findByPk(id);
  if (!c) throw new Error("Không tìm thấy khách hàng");
  return c;
};

const findByPhone = async (phone) => Customer.findOne({ where: { phone } });

const create = async (data) => {
  if (data.phone) {
    const exists = await findByPhone(data.phone);
    if (exists) throw new Error("Số điện thoại đã được đăng ký");
  }
  return Customer.create(data);
};

const update = async (id, data) => {
  const c = await getById(id);
  return c.update(data);
};

// Cộng điểm sau mỗi đơn hàng: 1 điểm / 10.000đ
const addPoints = async (id, amount) => {
  const c = await getById(id);
  const points = Math.floor(amount / 10000);
  return c.update({ point: c.point + points });
};

module.exports = { getAll, getById, findByPhone, create, update, addPoints };
