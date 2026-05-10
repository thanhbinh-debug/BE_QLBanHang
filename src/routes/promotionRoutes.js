const router = require("express").Router();
const ctrl = require("../controllers/promotionController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

// Route cho admin quản lý - Lấy tất cả (MỚI THÊM)
router.get("/", role("admin", "manager"), ctrl.getAll);

// Cashier chỉ xem KM đang hoạt động để áp vào đơn
router.get("/active", ctrl.getActive);
router.get("/:id", ctrl.getById);

// Chỉ admin/manager mới tạo và chỉnh sửa KM
router.post("/", role("admin", "manager"), ctrl.create);
router.put("/:id", role("admin", "manager"), ctrl.update);

module.exports = router;
