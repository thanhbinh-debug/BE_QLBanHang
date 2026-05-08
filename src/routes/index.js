const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/suppliers", require("./supplierRoutes"));
router.use("/customers", require("./customerRoutes"));
router.use("/orders", require("./orderRoutes"));
router.use("/inventory", require("./inventoryRoutes"));
router.use("/stock-imports", require("./stockImportRoutes"));
router.use("/promotions", require("./promotionRoutes"));
router.use("/shifts", require("./shiftRoutes"));
router.use("/reports", require("./reportRoutes"));

module.exports = router;
