const svc = require("../services/reportService");
const { success, error } = require("../utils/response");

// Doanh thu theo ngày — query: ?date=2025-01-15
exports.revenueByDay = async (req, res) => {
  try {
    success(res, await svc.revenueByDay(req.query.date || new Date()));
  } catch (err) {
    error(res, err.message);
  }
};

// Doanh thu theo tháng — query: ?month=2025-01
exports.revenueByMonth = async (req, res) => {
  try {
    success(res, await svc.revenueByMonth(req.query.month || new Date()));
  } catch (err) {
    error(res, err.message);
  }
};

// Top sản phẩm bán chạy — query: ?startDate=2025-01-01&endDate=2025-01-31&limit=10
exports.topProducts = async (req, res) => {
  try {
    const { startDate, endDate, limit } = req.query;
    if (!startDate || !endDate)
      return error(res, "Thiếu startDate hoặc endDate", 400);
    success(res, await svc.topSellingProducts(startDate, endDate, limit));
  } catch (err) {
    error(res, err.message);
  }
};

// Tổng hợp tồn kho toàn bộ sản phẩm
exports.inventorySummary = async (req, res) => {
  try {
    success(res, await svc.inventorySummary());
  } catch (err) {
    error(res, err.message);
  }
};
