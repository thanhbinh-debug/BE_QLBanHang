// Format số thành tiền VNĐ: 50000 → "50.000 ₫"
const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

const parseNumber = (value) => parseFloat(value) || 0;

module.exports = { formatVND, parseNumber };
