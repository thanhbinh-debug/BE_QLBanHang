const {
  StockImport,
  StockImportItem,
  Product,
  Supplier,
} = require("../models");
const { generateImportCode } = require("../utils/generateCode");
const inventoryService = require("./inventoryService");
const { getPagination } = require("../utils/pagination");

const create = async ({ supplierId, items, note, userId }) => {
  let totalAmount = 0;
  const enrichedItems = [];

  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product)
      throw new Error(`Sản phẩm ID ${item.productId} không tồn tại`);
    const subtotal = item.costPrice * item.quantity;
    totalAmount += subtotal;
    enrichedItems.push({ ...item, subtotal });
  }

  const stockImport = await StockImport.create({
    importCode: generateImportCode(),
    supplierId,
    totalAmount,
    note,
    userId,
    importDate: new Date(),
    status: "completed",
  });

  for (const item of enrichedItems) {
    await StockImportItem.create({ stockImportId: stockImport.id, ...item });
    // Cộng tồn kho & cập nhật giá nhập mới nhất
    await inventoryService.increaseStock(item.productId, item.quantity, userId);
    await Product.update(
      { costPrice: item.costPrice },
      { where: { id: item.productId } },
    );
  }

  return stockImport;
};

const getAll = async (query) => {
  const { limit, offset, page } = getPagination(query);
  const result = await StockImport.findAndCountAll({
    limit,
    offset,
    include: [
      { model: Supplier, as: "supplier", attributes: ["id", "name"] },
      { model: StockImportItem, as: "items", include: ["product"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  return { ...result, page, limit };
};

const getById = async (id) => {
  const si = await StockImport.findByPk(id, {
    include: [
      "supplier",
      { model: StockImportItem, as: "items", include: ["product"] },
    ],
  });
  if (!si) throw new Error("Không tìm thấy phiếu nhập");
  return si;
};

module.exports = { create, getAll, getById };
