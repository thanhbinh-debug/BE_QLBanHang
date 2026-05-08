const { Order, OrderItem, Product } = require("../models");
const { generateOrderCode } = require("../utils/generateCode");
const inventoryService = require("./inventoryService");

const createOrder = async ({
  items,
  paymentMethod,
  customerId,
  userId,
  discount = 0,
}) => {
  // 1. Tính tổng tiền
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

  // 2. Tạo đơn hàng
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

  // 3. Tạo chi tiết đơn & trừ tồn kho
  for (const item of items) {
    await OrderItem.create({ orderId: order.id, ...item });
    await inventoryService.decreaseStock(item.productId, item.quantity);
  }

  return order;
};

module.exports = { createOrder };
