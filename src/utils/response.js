const success = (res, data, message = "Thành công", statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });

const error = (res, message = "Lỗi server", statusCode = 500) =>
  res.status(statusCode).json({ success: false, message });

const paginate = (res, result, page, limit) => {
  res.status(200).json({
    success: true,
    data: result.rows, // Danh sách dữ liệu (ví dụ: danh sách sản phẩm)
    pagination: {
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: parseInt(page),
      limit: parseInt(limit),
    },
  });
};

module.exports = { success, error, paginate };
