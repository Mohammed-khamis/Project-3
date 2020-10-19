const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "you must fill your name"],
    },
  email: {
    type: String,
    required: [true, "you must fill your email"],
    unique: true,
    },
  password: { 
      type: String, 
      required: [true, "you must fill your password"] 
    },
});

const Account = mongoose.model("Account", registerSchema);

module.exports = Account;