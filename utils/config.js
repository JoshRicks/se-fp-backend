const { JWT_SECRET = "Keepitsecretkeepitsafe" } = process.env;
const { MONGO_URI = "mongodb://localhost:27017/NewsExplorer_db" } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URI,
};
