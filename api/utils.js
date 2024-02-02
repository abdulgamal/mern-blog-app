const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
};

const verifyToken = (req, res, next) => {
  const { access_token } = req.cookies;

  const { userId } = jwt.verify(access_token, process.env.SECRET_JWT);
  req.userId = userId;

  next();
};

module.exports.connectToDB = connectToDB;
module.exports.verifyToken = verifyToken;

// module.exports = {
//   connectToDB,
//   verifyToken,
// };
