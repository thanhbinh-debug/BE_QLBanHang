const router = require("express").Router();
const ctrl = require("../controllers/shiftController");
const auth = require("../middlewares/authMiddleware");

router.use(auth);

// Tất cả roles đều có thể mở/đóng ca của chính mình
router.post("/open", ctrl.open);
router.post("/close", ctrl.close);
router.get("/current", ctrl.getCurrent);
router.get("/history", ctrl.getHistory);

module.exports = router;
