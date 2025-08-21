const router = require("express").Router();
const { getCurrentUser } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.use(auth);

router.get("/users/me", getCurrentUser);

module.exports = router;
