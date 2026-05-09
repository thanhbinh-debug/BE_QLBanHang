// const router = require("express").Router();
// const authController = require("../controllers/authController");

// router.post("/login", authController.login);
// router.post("/register", authController.register);

// module.exports = router;

const router = require("express").Router();
const ctrl = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", ctrl.register); // public
router.post("/login", ctrl.login); // public
router.get("/me", auth, ctrl.me); // must be logged in

module.exports = router;
