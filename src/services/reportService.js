const { Op, fn, col } = require("sequelize");
const { Order, OrderItem, Product, Category } = require("../models");
const {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} = require("../utils/dateHelper");

// Doanh thu theo ngày
const revenueByDay = async (date) =>
  Order.findAll({
    where: {
      status: "completed",
      createdAt: { [Op.between]: [startOfDay(date), endOfDay(date)] },
    },
    attributes: [
      [fn("COUNT", col("id")), "totalOrders"],
      [fn("SUM", col("finalAmount")), "totalRevenue"],
      [fn("SUM", col("discount")), "totalDiscount"],
    ],
    raw: true,
  });

// Doanh thu theo từng ngày trong tháng
const revenueByMonth = async (month) =>
  Order.findAll({
    where: {
      status: "completed",
      createdAt: { [Op.between]: [startOfMonth(month), endOfMonth(month)] },
    },
    attributes: [
      [fn("DATE", col("createdAt")), "date"],
      [fn("COUNT", col("id")), "totalOrders"],
      [fn("SUM", col("finalAmount")), "totalRevenue"],
    ],
    group: [fn("DATE", col("createdAt"))],
    order: [[fn("DATE", col("createdAt")), "ASC"]],
    raw: true,
  });

// Top sản phẩm bán chạy
const topSellingProducts = async (startDate, endDate, limit = 10) =>
  OrderItem.findAll({
    attributes: [
      "productId",
      [fn("SUM", col("quantity")), "totalQuantity"],
      [fn("SUM", col("subtotal")), "totalRevenue"],
    ],
    include: [
      { model: Product, as: "product", attributes: ["id", "name", "barcode"] },
      {
        model: Order,
        as: "order",
        where: {
          status: "completed",
          createdAt: { [Op.between]: [startDate, endDate] },
        },
        attributes: [],
      },
    ],
    group: ["productId"],
    order: [[fn("SUM", col("quantity")), "DESC"]],
    limit: parseInt(limit),
  });

// Tổng hợp tồn kho toàn bộ sản phẩm
const inventorySummary = async () =>
  Product.findAll({
    where: { isActive: true },
    attributes: [
      "id",
      "name",
      "barcode",
      "stock",
      "minStock",
      "costPrice",
      "sellPrice",
    ],
    include: [{ model: Category, as: "category", attributes: ["name"] }],
    order: [["stock", "ASC"]],
  });

module.exports = {
  revenueByDay,
  revenueByMonth,
  topSellingProducts,
  inventorySummary,
};
