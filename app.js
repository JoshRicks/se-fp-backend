require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes/index");
const { globalErrorHandler } = require("./middleware/errors");
const { requestLogger, errorLogger } = require("./middleware/logger");

const PORT = process.env.PORT;

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(requestLogger);

app.use("/", routes);

app.use(errorLogger);

app.use(errors());

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
