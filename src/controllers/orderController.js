const svc = require("../services/orderService");
const { success, error, paginate } = require("../utils/response");

// Tạo đơn từ màn hình POS
// Body: { items: [{productId, quantity}], paymentMethod, customerId?, promotionId? }
exports.create = async (req, res) => {
  try {
    // userId lấy từ token đăng nhập, không cần truyền lên
    const order = await svc.createOrder({ ...req.body, userId: req.user.id });
    success(res, order, "Tạo đơn hàng thành công", 201);
  } catch (err) {
    error(res, err.message, 400);
  }
};

exports.getAll = async (req, res) => {
  // Hỗ trợ query: ?status=completed&startDate=2025-01-01&endDate=2025-01-31
  try {
    const r = await svc.getAll(req.query);
    paginate(res, r, r.page, r.limit);
  } catch (err) {
    error(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    success(res, await svc.getById(req.params.id));
  } catch (err) {
    error(res, err.message, 404);
  }
};

// Hủy đơn — hoàn lại tồn kho tự động
exports.cancel = async (req, res) => {
  try {
    success(
      res,
      await svc.cancelOrder(req.params.id, req.user.id),
      "Đã hủy đơn hàng",
    );
  } catch (err) {
    error(res, err.message, 400);
  }
};
