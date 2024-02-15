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

function generateRandomPassword(username) {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="; // Define the characters to be used in the random password
  const passwordLength = 10; // Define the length of the random password

  let password = username; // Start with the username
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * randomChars.length); // Generate a random index
    password += randomChars.charAt(randomIndex); // Append a random character to the password
  }

  return password;
}

module.exports.connectToDB = connectToDB;
module.exports.verifyToken = verifyToken;
module.exports.generateRandomPassword = generateRandomPassword;

// module.exports = {
//   connectToDB,
//   verifyToken,
// };
