const svc = require("../services/userService");
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
exports.create = async (req, res) => {
  try {
    success(res, await svc.create(req.body), "Tạo nhân viên thành công", 201);
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
    success(res, null, "Đã vô hiệu hóa nhân viên");
  } catch (err) {
    error(res, err.message, 400);
  }
};
