const router = require("express").Router();
const ctrl = require("../controllers/categoryController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

// Tất cả roles đều xem được danh mục
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

// Chỉ admin và manager mới tạo/sửa/xóa
router.post("/", role("admin", "manager"), ctrl.create);
router.put("/:id", role("admin", "manager"), ctrl.update);
router.delete("/:id", role("admin"), ctrl.remove);

module.exports = router;
