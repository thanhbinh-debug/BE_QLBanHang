const router = require("express").Router();
const ctrl = require("../controllers/customerController");
const auth = require("../middlewares/authMiddleware");

router.use(auth);

// Tất cả roles đều dùng được (cashier cần tra cứu KH khi bán)
router.get("/", ctrl.getAll);
router.get("/phone/:phone", ctrl.findByPhone); // /customers/phone/0912345678
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);

module.exports = router;
