const router = require("express").Router();
const ctrl = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth); // tất cả routes bên dưới đều cần đăng nhập

router.get("/", role("admin"), ctrl.getAll);
router.get("/:id", role("admin"), ctrl.getById);
router.post("/", role("admin"), ctrl.create);
router.put("/:id", role("admin"), ctrl.update);
router.delete("/:id", role("admin"), ctrl.remove);

module.exports = router;
