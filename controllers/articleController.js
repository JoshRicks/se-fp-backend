const mongoose = require("mongoose");

const Article = require("../models/Article");

const { ForbiddenError } = require("../utils/ForbiddenError");
const { BadRequestError } = require("../utils/BadRequestError");
const { NotFoundError } = require("../utils/NotFoundError");
const { AuthorizationError } = require("../utils/AuthorizationError");

const getSavedArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => {
      console.error(err);
      console.error(err);
      if (err.name === "NotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

const saveArticle = (req, res, next) => {
  const { keyword, text, date, source, title, link, image } = req.body;

  return Article.create({
    keyword,
    text,
    date,
    source,
    title,
    link,
    image,
    owner: req.user._id,
  })
    .then((articles) => res.status(201).send({ data: articles }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Title, keyword, text, date, image, link, and source are required fields."
          )
        );
      }
      if (err.name === "AuthorizationError") {
        return next(new AuthorizationError("Unauthorized"));
      }
      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  if (!articleId) {
    throw new NotFoundError("Article ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new BadRequestError("invalid Article ID format");
  }
  return Article.findById(articleId)
    .then((articleToDelete) => {
      if (!articleToDelete) {
        throw new NotFoundError("Article not found");
      }
      if (
        !articleToDelete.owner ||
        !articleToDelete.owner.equals(req.user._id)
      ) {
        throw new ForbiddenError("Forbidden");
      }
      return Article.findByIdAndDelete(articleId).then((articles) => {
        res.status(200).send({ data: articles });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("A valid article ID must be provided.")
        );
      }
      if (err.name === "NotFoundError") {
        return next(new NotFoundError("Article not found"));
      }
      if (err.name === "AuthorizationError") {
        return next(new AuthorizationError("Unauthorized"));
      }
      if (err.name === "ForbiddenError") {
        return next(new ForbiddenError("Forbidden"));
      }
      return next(err);
    });
};

module.exports = {
  getSavedArticles,
  saveArticle,
  deleteArticle,
};
