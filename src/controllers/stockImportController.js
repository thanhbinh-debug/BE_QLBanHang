const svc = require("../services/stockImportService");
const { success, error, paginate } = require("../utils/response");

// Tạo phiếu nhập hàng từ NCC
// Body: { supplierId, note, items: [{productId, quantity, costPrice, expiredDate?}] }
exports.create = async (req, res) => {
  try {
    const result = await svc.create({ ...req.body, userId: req.user.id });
    success(res, result, "Nhập hàng thành công", 201);
  } catch (err) {
    error(res, err.message, 400);
  }
};

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
