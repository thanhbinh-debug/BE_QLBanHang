const router = require("express").Router();
const ctrl = require("../controllers/orderController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);
router.post("/", role("admin", "manager", "cashier"), ctrl.create); // tạo đơn POS
router.get("/", role("admin", "manager"), ctrl.getAll);
router.get("/:id", role("admin", "manager", "cashier"), ctrl.getById);
router.patch("/:id/cancel", role("admin", "manager"), ctrl.cancel); // hủy đơn

module.exports = router;
