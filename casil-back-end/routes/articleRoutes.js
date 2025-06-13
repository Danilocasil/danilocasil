const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleControllers");

router.route("/").get(getArticles).post(createArticle);
router.route("/:id").put(updateArticle).delete(deleteArticle);
router.route("/name/:name").get(getArticleByName);

module.exports = router;