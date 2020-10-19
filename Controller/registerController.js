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

const updateAccount = async (req, res) => {
    try {
        if (req.body.password) req.body.password = await hashPassword(req.body.password);
        const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(account);
    } catch (err) {
      res.status(400).json(err);
    }
};

const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        res.status(200).json("The account has been deleted!");
    } catch (err) {
      res.status(400).json(err);
    }
};

module.exports = {
  allAccounts,
  creatNewAccount,
  updateAccount,
  deleteAccount,
};

