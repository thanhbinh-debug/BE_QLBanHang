const router = require("express").Router();
const ctrl = require("../controllers/reportController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

// Chỉ admin và manager mới xem báo cáo
router.use(auth, role("admin", "manager"));

router.get("/revenue/day", ctrl.revenueByDay);
router.get("/revenue/month", ctrl.revenueByMonth);
router.get("/top-products", ctrl.topProducts);
router.get("/inventory-summary", ctrl.inventorySummary);

module.exports = router;
