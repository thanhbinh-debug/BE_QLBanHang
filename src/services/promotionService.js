const { Op } = require("sequelize");
const { Promotion } = require("../models");

// Lấy tất cả danh sách (Dùng cho trang quản trị) - MỚI THÊM
const getAll = async () => {
  return Promotion.findAll({
    order: [["createdAt", "DESC"]],
  });
};

const getActive = async () => {
  const today = new Date();
  return Promotion.findAll({
    where: {
      isActive: true,
      startDate: { [Op.lte]: today },
      endDate: { [Op.gte]: today },
    },
  });
};

const getById = async (id) => {
  const p = await Promotion.findByPk(id);
  if (!p) throw new Error("Không tìm thấy khuyến mãi");
  return p;
};

const create = async (data) => Promotion.create(data);

const update = async (id, data) => {
  const p = await getById(id);
  return p.update(data);
};

const applyPromotion = async (promotionId, totalAmount) => {
  if (!promotionId) return 0;
  const promo = await getById(promotionId);
  const today = new Date();

  if (!promo.isActive) throw new Error("Khuyến mãi không còn hiệu lực");
  if (today < new Date(promo.startDate))
    throw new Error("Khuyến mãi chưa bắt đầu");
  if (today > new Date(promo.endDate)) throw new Error("Khuyến mãi đã hết hạn");
  if (totalAmount < promo.minOrderAmount)
    throw new Error(`Đơn tối thiểu ${promo.minOrderAmount}đ để áp khuyến mãi`);

  let discount =
    promo.type === "percent" ? (totalAmount * promo.value) / 100 : promo.value;

  if (promo.maxDiscount) discount = Math.min(discount, promo.maxDiscount);
  return discount;
};

// Đừng quên thêm getAll vào exports
module.exports = { getAll, getActive, getById, create, update, applyPromotion };
