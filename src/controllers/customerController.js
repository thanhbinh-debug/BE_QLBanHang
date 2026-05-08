const svc = require("../services/customerService");
const { success, error, paginate } = require("../utils/response");

exports.getAll = async (req, res) => {
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

// Tìm nhanh theo SĐT khi thanh toán POS
exports.findByPhone = async (req, res) => {
  try {
    const c = await svc.findByPhone(req.params.phone);
    if (!c) return error(res, "Không tìm thấy khách hàng", 404);
    success(res, c);
  } catch (err) {
    error(res, err.message, 404);
  }
};

exports.create = async (req, res) => {
  try {
    success(res, await svc.create(req.body), "Thêm khách hàng thành công", 201);
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
