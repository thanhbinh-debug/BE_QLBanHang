const svc = require("../services/categoryService");
const { success, error } = require("../utils/response");

// Không cần phân trang vì danh mục thường ít
exports.getAll = async (req, res) => {
  try {
    success(res, await svc.getAll());
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
    success(res, await svc.create(req.body), "Tạo danh mục thành công", 201);
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

exports.remove = async (req, res) => {
  try {
    await svc.remove(req.params.id);
    success(res, null, "Đã xóa danh mục");
  } catch (err) {
    error(res, err.message, 400);
  }
};
