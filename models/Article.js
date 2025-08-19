const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value, {
          require_protocol: true,
          require_tld: true,
          require_host: true,
        });
      },
      message: "Must be a valid URL",
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value, {
          require_protocol: true,
          require_tld: true,
          require_host: true,
        });
      },
      message: "Must be a valid URL",
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("article", articleSchema);
