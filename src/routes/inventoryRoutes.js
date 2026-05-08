const router = require("express").Router();
const ctrl = require("../controllers/inventoryController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

// Chỉ admin/manager mới được điều chỉnh và xem lịch sử kho
router.post("/adjust", role("admin", "manager"), ctrl.adjustStock);
router.get("/logs/:productId", role("admin", "manager"), ctrl.getLogs);

module.exports = router;
