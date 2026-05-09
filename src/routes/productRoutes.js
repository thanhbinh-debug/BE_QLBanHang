const router = require("express").Router();
const ctrl = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const multer = require("multer");
const path = require("path");

// Cấu hình upload ảnh sản phẩm
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/products/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.use(auth);
router.get("/low-stock", role("admin", "manager"), ctrl.getLowStock); // cảnh báo sắp hết hàng
router.get("/barcode/:barcode", ctrl.getByBarcode); // quét mã vạch POS
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", role("admin", "manager"), upload.single("image"), ctrl.create);
router.put(
  "/:id",
  role("admin", "manager"),
  upload.single("image"),
  ctrl.update,
);
router.delete("/:id", role("admin"), ctrl.remove);

module.exports = router;
