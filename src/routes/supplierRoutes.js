const router = require("express").Router();
const ctrl = require("../controllers/supplierController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

router.get("/", role("admin", "manager"), ctrl.getAll);
router.get("/:id", role("admin", "manager"), ctrl.getById);
router.post("/", role("admin", "manager"), ctrl.create);
router.put("/:id", role("admin", "manager"), ctrl.update);
router.delete("/:id", role("admin"), ctrl.remove);

module.exports = router;
