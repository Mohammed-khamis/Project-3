const bcrypt = require("bcrypt");
const Account = require('../models/registerModel');

const hashPassword = (password) => {
  return bcrypt.hash(password, Number(process.env.SALT));
};

const creatNewAccount = async (req, res) => {
    try {
        req.body.password = await hashPassword(req.body.password);
        const newAccount = await Account.create(req.body);
        res.status(201).json(newAccount);   
    } catch (err) {
        res.status(400).json(err);
    }
};

const allAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);  
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateAccount = (req, res) => {};

const deleteAccount = (req, res) => {};

module.exports = {
  allAccounts,
  creatNewAccount,
  updateAccount,
  deleteAccount,
};

