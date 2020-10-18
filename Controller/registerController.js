const bcrypt = require("bcrypt");
const accounts = require("../Database/accounts");


const hashPassword = (password) => {
  return bcrypt.hash(password, Number(process.env.SALT));
};

const allAccounts = (req, res) => {
  res.json(accounts);
};

const creatNewAccount = async (req, res) => {
  const account = {
    name: req.body.name,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    posts: [],
    friends: [],
  };
  accounts.push(account);
  res.json(account);
};

const updateAccount = (req, res) => {};

const deleteAccount = (req, res) => {};

module.exports = {
  allAccounts,
  creatNewAccount,
  updateAccount,
  deleteAccount,
};

