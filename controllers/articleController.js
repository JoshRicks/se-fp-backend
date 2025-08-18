const mongoose = require("mongoose");

const Article = require("../models/Article");

const { ForbiddenError } = require("../utils/ForbiddenError");
const { BadRequestError } = require("../utils/BadRequestError");
const { NotFoundError } = require("../utils/NotFoundError");
const { AuthorizationError } = require("../utils/AuthorizationError");

const getSavedArticles = (req, res, next) => {
  Article.find({})
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
      if (err.name === "BadRequestError") {
        return next(
          new BadRequestError(
            "The provided URL is not valid. Please enter a valid article link."
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
    throw new NotFoundError("Item ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new BadRequestError("invalid Item ID format");
  }
  return Article.findByIdAndDelete(articleId)
    .then((deletedArticle) => {
      res.status(200).send({ data: deletedArticle });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("A valid article ID must be provided.")
        );
      }
      if (err.name === "NotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "BadRequestError") {
        return next(
          new BadRequestError(
            "The request to delete this article was not properly formatted."
          )
        );
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
