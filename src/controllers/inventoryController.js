const svc = require("../services/inventoryService");
const { success, error } = require("../utils/response");

// Điều chỉnh tồn kho thủ công (kiểm kho)
// Body: { productId, newQuantity, note }
exports.adjustStock = async (req, res) => {
  try {
    const { productId, newQuantity, note } = req.body;
    const result = await svc.adjustStock(
      productId,
      newQuantity,
      note,
      req.user.id,
    );
    success(res, result, "Điều chỉnh tồn kho thành công");
  } catch (err) {
    error(res, err.message, 400);
  }
};

// Xem lịch sử xuất/nhập của 1 sản phẩm
exports.getLogs = async (req, res) => {
  try {
    success(res, await svc.getLogs(req.params.productId));
  } catch (err) {
    error(res, err.message);
  }
};
