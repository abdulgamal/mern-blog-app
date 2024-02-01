const { default: mongoose } = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
};

module.exports = connectToDB;
