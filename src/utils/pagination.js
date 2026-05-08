/**
 * Truyền vào req.query, trả về { page, limit, offset }
 * Dùng cho tất cả API có danh sách
 */
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

module.exports = { getPagination };
