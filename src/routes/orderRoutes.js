const router = require("express").Router();
const ctrl = require("../controllers/orderController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

// Cho phép tất cả các role đã đăng nhập (bao gồm cả user) được lấy danh sách đơn hàng
// Lưu ý: Controller của bạn nên tự lọc để user chỉ thấy đơn của họ
router.get("/", role("admin", "manager", "cashier", "user"), ctrl.getAll);

router.post("/", role("admin", "manager", "cashier"), ctrl.create);
router.get("/:id", role("admin", "manager", "cashier", "user"), ctrl.getById);
router.patch("/:id/cancel", role("admin", "manager"), ctrl.cancel);

module.exports = router;
