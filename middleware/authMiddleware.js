const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("../utils/AuthorizationError");
const JWT_SECRET = require("../utils/config");

const handleAuthError = () => {
  throw new AuthorizationError("Unauthorized");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError();
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  return next();
};
