const router = require("express").Router();
const {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articleController");
const auth = require("../middleware/authMiddleware");
const {
  validateArticleId,
  validateSavedArticle,
} = require("../middleware/validation");

router.use(auth);

router.get("/articles", getSavedArticles);

router.post("/articles", validateSavedArticle, saveArticle);
router.delete("/articles/:articleId", validateArticleId, deleteArticle);

module.exports = router;
