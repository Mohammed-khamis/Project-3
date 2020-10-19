const bcrypt = require("bcrypt");
const Account = require('../models/registerModel');

const hashPassword = (password) => {
  return bcrypt.hash(password, Number(process.env.SALT));
};

const allAccounts = (req, res) => {
  
};

const creatNewAccount = async (req, res) => {
  
  
};

const updateAccount = (req, res) => {};

const deleteAccount = (req, res) => {};

module.exports = {
  allAccounts,
  creatNewAccount,
  updateAccount,
  deleteAccount,
};

