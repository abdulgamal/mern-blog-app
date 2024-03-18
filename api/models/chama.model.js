const mongoose = require("mongoose");

const chamaSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDRxkIyitXb_MFEFrtxFQGt7nfPoT4LrgH-g&usqp=CAU",
    },
    password: {
      type: String,
      required: true,
    },
    pushToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chama", chamaSchema);
