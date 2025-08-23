const router = require("express").Router();

const authRouter = require("./authRoutes");
const articleRouter = require("./articleRoutes");
const { login, createUser } = require("../controllers/authController");
const { NotFoundError } = require("../utils/NotFoundError");
const { validateLogin, validateUser } = require("../middleware/validation");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUser, createUser);

router.use("/", authRouter);
router.use("/", articleRouter);

router.use(() => {
  console.error();
  throw new NotFoundError("Requested resource not found");
});

module.exports = router;
