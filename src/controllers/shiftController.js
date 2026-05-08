const svc = require("../services/shiftService");
const { success, error } = require("../utils/response");

// Cashier mở ca đầu ngày — Body: { openingCash: 500000 }
exports.open = async (req, res) => {
  try {
    const shift = await svc.openShift(req.user.id, req.body.openingCash);
    success(res, shift, "Mở ca thành công", 201);
  } catch (err) {
    error(res, err.message, 400);
  }
};

// Cashier đóng ca cuối ngày — Body: { closingCash: 1200000, note? }
exports.close = async (req, res) => {
  try {
    const shift = await svc.closeShift(
      req.user.id,
      req.body.closingCash,
      req.body.note,
    );
    success(res, shift, "Đóng ca thành công");
  } catch (err) {
    error(res, err.message, 400);
  }
};

// Xem ca đang mở của chính mình
exports.getCurrent = async (req, res) => {
  try {
    success(res, await svc.getCurrent(req.user.id));
  } catch (err) {
    error(res, err.message);
  }
};

// Xem lịch sử các ca đã làm
exports.getHistory = async (req, res) => {
  try {
    success(res, await svc.getHistory(req.user.id));
  } catch (err) {
    error(res, err.message);
  }
};
