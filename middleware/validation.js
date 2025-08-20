const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
      "any.required": "Email field is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
      "any.required": "Email field is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateSavedArticle = celebrate({
  params: Joi.object().keys({
    keyword: Joi.string().required().min(1).messages({
      "string.empty": "A search is required",
    }),
    text: Joi.string().required().messages({
      "string.empty": "Text is required",
    }),
    date: Joi.string().required().messages({
      "string.empty": "Date is required",
    }),
    source: Joi.string().required().messages({
      "string.empty": "Source is required",
    }),
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "Link" field must be filled in',
      "string.uri": 'the "Link" field must be a valid url',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "Image" field must be filled in',
      "string.uri": 'the "Image" field must be a valid url',
    }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateArticleId,
  validateLogin,
  validateUser,
  validateSavedArticle,
};
