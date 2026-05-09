const { Op } = require("sequelize");
const { Product, Category, Supplier } = require("../models");
const { getPagination } = require("../utils/pagination");

const getAll = async (query) => {
  const { limit, offset, page } = getPagination(query);
  const where = { isActive: true };

  // Lọc theo tên / barcode / danh mục
  if (query.search) where.name = { [Op.like]: `%${query.search}%` };
  if (query.categoryId) where.categoryId = query.categoryId;
  if (query.barcode) where.barcode = query.barcode;

  const result = await Product.findAndCountAll({
    where,
    limit,
    offset,
    include: [
      { model: Category, as: "category", attributes: ["id", "name"] },
      { model: Supplier, as: "supplier", attributes: ["id", "name"] },
    ],
    order: [["name", "ASC"]],
  });
  return { ...result, page, limit };
};

// Quét mã vạch ở màn hình POS
const getByBarcode = async (barcode) => {
  const p = await Product.findOne({ where: { barcode, isActive: true } });
  if (!p) throw new Error("Không tìm thấy sản phẩm với mã vạch này");
  return p;
};

const getById = async (id) => {
  const p = await Product.findByPk(id, {
    include: ["category", "supplier"],
  });
  if (!p) throw new Error("Không tìm thấy sản phẩm");
  return p;
};

const create = async (data) => Product.create(data);

const update = async (id, data) => {
  const p = await getById(id);
  return p.update(data);
};

const remove = async (id) => {
  const p = await getById(id);
  return p.update({ isActive: false });
};

// Cảnh báo hàng gần hết (stock <= minStock)
const getLowStock = async () =>
  Product.findAll({
    where: { isActive: true, stock: { [Op.lte]: 5 } },
    order: [["stock", "ASC"]],
  });

module.exports = {
  getAll,
  getByBarcode,
  getById,
  create,
  update,
  remove,
  getLowStock,
};
