const svc = require("../services/productService");
const { success, error, paginate } = require("../utils/response");

exports.getAll = async (req, res) => {
  try {
    // Hỗ trợ query: ?search=coca&categoryId=1&page=1&limit=20
    const r = await svc.getAll(req.query);
    paginate(res, r, r.page, r.limit);
  } catch (err) {
    error(res, err.message);
  }
};

// Dùng cho màn hình POS khi quét mã vạch
exports.getByBarcode = async (req, res) => {
  try {
    success(res, await svc.getByBarcode(req.params.barcode));
  } catch (err) {
    error(res, err.message, 404);
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
    const data = { ...req.body };
    // Nếu có upload ảnh thì lưu tên file vào data
    if (req.file) data.image = req.file.filename;
    success(res, await svc.create(data), "Thêm sản phẩm thành công", 201);
  } catch (err) {
    error(res, err.message, 400);
  }
};

exports.update = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    success(res, await svc.update(req.params.id, data), "Cập nhật thành công");
  } catch (err) {
    error(res, err.message, 400);
  }
};

exports.remove = async (req, res) => {
  try {
    await svc.remove(req.params.id);
    success(res, null, "Đã xóa sản phẩm");
  } catch (err) {
    error(res, err.message, 400);
  }
};

// Danh sách sản phẩm sắp hết hàng — hiện ở dashboard
exports.getLowStock = async (req, res) => {
  try {
    success(res, await svc.getLowStock());
  } catch (err) {
    error(res, err.message);
  }
};
