const { Op } = require("sequelize");
const { Supplier } = require("../models");
const { getPagination } = require("../utils/pagination");

const getAll = async (query) => {
  const { limit, offset, page } = getPagination(query);
  const where = { isActive: true };
  if (query.search) where.name = { [Op.like]: `%${query.search}%` };
  const result = await Supplier.findAndCountAll({
    where,
    limit,
    offset,
    order: [["name", "ASC"]],
  });
  return { ...result, page, limit };
};

const getById = async (id) => {
  const s = await Supplier.findByPk(id);
  if (!s) throw new Error("Không tìm thấy nhà cung cấp");
  return s;
};

const create = async (data) => Supplier.create(data);

const update = async (id, data) => {
  const s = await getById(id);
  return s.update(data);
};

const remove = async (id) => {
  const s = await getById(id);
  return s.update({ isActive: false });
};

module.exports = { getAll, getById, create, update, remove };
