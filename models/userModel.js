const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

require("dotenv").config();


const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate:{
      validator: function(element) {
        return element === this.password
      },
      message: "Passwords are not the same!",
    }
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
});


userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, Number(process.env.SALT));
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

