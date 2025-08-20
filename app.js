require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");

const routes = require("./routes/index");
const { globalErrorHandler } = require("./middleware/errors");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { apiLimiter } = require("./middleware/apiLimiter");

const { PORT = 3001, MONGO_URI = "mongodb://localhost:27017/NewsExplorer_db" } =
  process.env;

const app = express();

mongoose.connect(MONGO_URI);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/", apiLimiter);

app.use(requestLogger);

app.use("/", routes);

app.use(errorLogger);

app.use(errors());

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
