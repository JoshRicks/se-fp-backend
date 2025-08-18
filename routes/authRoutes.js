const router = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const { validateLogin, validateUser } = require("../middleware/validation");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUser, createUser);

router.use(auth);

router.get("/users/me", getCurrentUser);

module.exports = router;
