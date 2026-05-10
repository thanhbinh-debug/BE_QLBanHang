const svc = require("../services/promotionService");
const { success, error } = require("../utils/response");

// Lấy danh sách KM đang hiệu lực — dùng ở màn hình POS để chọn
exports.getAll = async (req, res) => {
  try {
    const data = await svc.getAll(); // Gọi hàm getAll trong service
    success(res, data);
  } catch (err) {
    error(res, err.message);
  }
};
exports.getActive = async (req, res) => {
  try {
    const data = await svc.getActive();
    success(res, data);
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

exports.create = async (req, res) => {
  try {
    success(res, await svc.create(req.body), "Tạo khuyến mãi thành công", 201);
  } catch (err) {
    error(res, err.message, 400);
  }
};

exports.update = async (req, res) => {
  try {
    success(
      res,
      await svc.update(req.params.id, req.body),
      "Cập nhật thành công",
    );
  } catch (err) {
    error(res, err.message, 400);
  }
};
