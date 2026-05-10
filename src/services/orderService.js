const { Order, OrderItem, Product, Customer, User } = require("../models");
const { generateOrderCode } = require("../utils/generateCode");
const inventoryService = require("./inventoryService");
const { getPagination } = require("../utils/pagination");
const { Op } = require("sequelize");

// Hàm lấy danh sách đơn hàng (Cần thêm để fix lỗi svc.getAll)
const getAll = async (query) => {
  const { limit, offset, page } = getPagination(query);
  const where = {};

  // 1. Lọc theo trạng thái
  if (query.status) where.status = query.status;

  // 2. Lọc theo thời gian
  if (query.startDate && query.endDate) {
    where.createdAt = {
      [Op.between]: [
        query.startDate + " 00:00:00",
        query.endDate + " 23:59:59",
      ],
    };
  }

  // 3. QUAN TRỌNG: Nếu có userId truyền từ Controller vào thì chỉ lấy đơn của user đó
  if (query.userId) where.userId = query.userId;

  const result = await Order.findAndCountAll({
    where,
    limit,
    offset,
    include: [
      { model: Customer, as: "customer", attributes: ["id", "name"] },
      { model: User, as: "cashier", attributes: ["id", "name"] },
    ],
    order: [["createdAt", "DESC"]],
  });

  return { ...result, page, limit };
};

const createOrder = async ({
  items,
  paymentMethod,
  customerId,
  userId,
  discount = 0,
}) => {
  let totalAmount = 0;
  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product)
      throw new Error(`Sản phẩm ID ${item.productId} không tồn tại`);
    if (product.stock < item.quantity)
      throw new Error(`${product.name} không đủ hàng`);
    item.price = product.sellPrice;
    item.subtotal = product.sellPrice * item.quantity;
    totalAmount += item.subtotal;
  }

  const finalAmount = totalAmount - discount;

  const order = await Order.create({
    orderCode: generateOrderCode(),
    totalAmount,
    discount,
    finalAmount,
    paymentMethod,
    customerId,
    userId,
    status: "completed",
  });

  for (const item of items) {
    await OrderItem.create({ orderId: order.id, ...item });
    await inventoryService.decreaseStock(item.productId, item.quantity);
  }

  return order;
};

const getById = async (id) => {
  const order = await Order.findByPk(id, {
    include: [
      { model: OrderItem, as: "items", include: ["product"] },
      "customer",
      "cashier",
    ],
  });
  if (!order) throw new Error("Không tìm thấy đơn hàng");
  return order;
};

const cancel = async (id) => {
  const order = await getById(id);
  if (order.status === "cancelled")
    throw new Error("Đơn hàng đã được hủy trước đó");

  for (const item of order.items) {
    await inventoryService.increaseStock(item.productId, item.quantity);
  }

  return order.update({ status: "cancelled" });
};

// EXPORT ĐẦY ĐỦ CÁC HÀM
module.exports = {
  createOrder,
  getAll,
  getById,
  cancel,
};
