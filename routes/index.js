const router = require("express").Router();

const authRouter = require("./authRoutes");
const articleRouter = require("./articleRoutes");
const { NotFoundError } = require("../utils/NotFoundError");

router.use("/saved-news", articleRouter);
router.use("/", authRouter);

router.use(() => {
  console.error();
  throw new NotFoundError("Requested resource not found");
});

module.exports = router;
