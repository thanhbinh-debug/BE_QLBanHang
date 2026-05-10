const svc = require("../services/orderService");
const { success, error, paginate } = require("../utils/response");
const { Order, User, OrderItem, Customer } = require("../models");

// Tạo đơn từ màn hình POS
// Body: { items: [{productId, quantity}], paymentMethod, customerId?, promotionId? }
exports.create = async (req, res) => {
  try {
    // userId lấy từ token đăng nhập, không cần truyền lên
    const order = await svc.createOrder({ ...req.body, userId: req.user.id });
    success(res, order, "Tạo đơn hàng thành công", 201);
  } catch (err) {
    error(res, err.message, 400);
  }
};

// exports.getAll = async (query) => {
//   const { limit, offset, page } = getPagination(query);
//   const where = {};

//   if (query.status) where.status = query.status;
//   if (query.startDate && query.endDate) {
//     where.createdAt = {
//       [Op.between]: [
//         query.startDate + " 00:00:00",
//         query.endDate + " 23:59:59",
//       ],
//     };
//   }
//   if (query.userId) where.userId = query.userId;

//   const result = await Order.findAndCountAll({
//     where,
//     limit,
//     offset,
//     include: [
//       { model: Customer, as: "customer", attributes: ["id", "name"] },
//       // SỬA Ở ĐÂY: Đổi "user" thành "cashier"
//       { model: User, as: "cashier", attributes: ["id", "name"] },
//     ],
//     order: [["createdAt", "DESC"]],
//   });

//   return { ...result, page, limit };
// };

exports.getAll = async (req, res) => {
  try {
    const query = { ...req.query };

    // Nếu là user thường, chỉ cho phép xem đơn hàng của chính họ
    if (req.user.role === "user") {
      query.userId = req.user.id;
    }

    // Gọi trực tiếp service, service sẽ tự gọi getPagination bên trong nó
    const r = await svc.getAll(query);

    // Trả về dữ liệu qua hàm paginate (hàm này lấy từ utils/response)
    paginate(res, r, r.page, r.limit);
  } catch (err) {
    error(res, err.message);
  }
};

// exports.getById = async (id) => {
//   const order = await Order.findByPk(id, {
//     include: [
//       { model: OrderItem, as: "items", include: ["product"] },
//       { model: Customer, as: "customer" },
//       // SỬA Ở ĐÂY: Đổi "user" thành "cashier"
//       { model: User, as: "cashier", attributes: ["id", "name"] },
//     ],
//   });
//   if (!order) throw new Error("Không tìm thấy đơn hàng");
//   return order;
// };

exports.getById = async (req, res) => {
  // Phải có cả req và res
  try {
    // 1. Lấy ID từ đường dẫn URL (ví dụ: /orders/10 -> id = 10)
    const { id } = req.params;

    // 2. Truyền biến 'id' (là con số) vào findByPk, KHÔNG truyền req
    const order = await Order.findByPk(id, {
      include: [
        { model: OrderItem, as: "items", include: ["product"] },
        { model: Customer, as: "customer" },
        { model: User, as: "cashier", attributes: ["id", "name"] },
      ],
    });

    if (!order) {
      return error(res, "Không tìm thấy đơn hàng", 404);
    }

    success(res, order, "Lấy chi tiết đơn hàng thành công");
  } catch (err) {
    error(res, err.message);
  }
};

// Hủy đơn — hoàn lại tồn kho tự động
exports.cancel = async (req, res) => {
  try {
    success(
      res,
      await svc.cancelOrder(req.params.id, req.user.id),
      "Đã hủy đơn hàng",
    );
  } catch (err) {
    error(res, err.message, 400);
  }
};
