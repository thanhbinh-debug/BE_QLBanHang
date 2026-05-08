const { Category, Product } = require("../models");

const getAll = async () =>
  Category.findAll({ where: { isActive: true }, order: [["name", "ASC"]] });

const getById = async (id) => {
  const cat = await Category.findByPk(id);
  if (!cat) throw new Error("Không tìm thấy danh mục");
  return cat;
};

const create = async (data) => {
  const exists = await Category.findOne({ where: { name: data.name } });
  if (exists) throw new Error("Tên danh mục đã tồn tại");
  return Category.create(data);
};

const update = async (id, data) => {
  const cat = await getById(id);
  return cat.update(data);
};

const remove = async (id) => {
  const cat = await getById(id);
  // Không cho xóa nếu đang có sản phẩm thuộc danh mục này
  const count = await Product.count({ where: { categoryId: id } });
  if (count > 0) throw new Error("Không thể xóa danh mục đang có sản phẩm");
  return cat.update({ isActive: false });
};

module.exports = { getAll, getById, create, update, remove };
