const router = require("express").Router();
const ctrl = require("../controllers/stockImportController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

// Toàn bộ routes này chỉ dành cho admin và manager
router.use(auth, role("admin", "manager"));

router.post("/", ctrl.create);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

module.exports = router;
