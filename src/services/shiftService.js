const { Op } = require("sequelize");
const { Shift, Order } = require("../models");

const openShift = async (userId, openingCash) => {
  // Kiểm tra có ca đang mở không
  const existing = await Shift.findOne({ where: { userId, status: "open" } });
  if (existing)
    throw new Error("Bạn đang có ca chưa đóng. Vui lòng đóng ca trước.");
  return Shift.create({
    userId,
    openingCash,
    openTime: new Date(),
    status: "open",
  });
};

const closeShift = async (userId, closingCash, note) => {
  const shift = await Shift.findOne({ where: { userId, status: "open" } });
  if (!shift) throw new Error("Không tìm thấy ca đang mở");

  // Tổng hợp doanh thu trong ca
  const orders = await Order.findAll({
    where: {
      userId,
      status: "completed",
      createdAt: { [Op.between]: [shift.openTime, new Date()] },
    },
  });
  const totalRevenue = orders.reduce(
    (sum, o) => sum + parseFloat(o.finalAmount),
    0,
  );
  const totalOrders = orders.length;
  const expectedCash = parseFloat(shift.openingCash) + totalRevenue;

  return shift.update({
    closeTime: new Date(),
    closingCash,
    totalRevenue,
    totalOrders,
    expectedCash,
    note,
    status: "closed",
  });
};

const getCurrent = async (userId) =>
  Shift.findOne({ where: { userId, status: "open" } });

const getHistory = async (userId) =>
  Shift.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
    limit: 30,
  });

module.exports = { openShift, closeShift, getCurrent, getHistory };
