const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide  your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  /*password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
  },*/
});

const user = mongoose.model("user", registerSchema);

module.exports = user;