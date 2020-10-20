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
        res.status(400).json("The account is already exist.");
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

const getTheAccount = async (req, res) => {
  try {
    let account = await Account.find({name: req.body.name});
    if(account.length === 0) account = await Account.find({email: req.body.email});
    if (account.length === 0) res.status(404).json("Invalid name or email");
    res.status(200).json(account);

  } catch (err) {
    res.status(400).json(err);
  }
};

const updateAccount = async (req, res) => {
    try {
        let account = await Account.findById(req.params.id);
        if (!account) res.status(400).json("Invalid ID");
        const password = await bcrypt.compare(req.body[0].password, account.password);
        if(!password) res.status(400).json("Invalid Password");
        account = await Account.updateOne(
          { name: req.body[1].name },
          { email: req.body[1].email },
          { password: await bcrypt.hash(req.body[1].newPassword) }
        );
        res.status(200).json(account);
    } catch (err) {
      res.status(400).json(err);
    }
};

const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if(!account) res.status(400).json("Invalid ID");
        const password = await bcrypt.compare(req.body.password, account.password);
        if(!password) res.status(400).json("Invalid Password");
        else await account.deleteOne();
        res.status(200).json("The account has been deleted!");

    } catch (err) {
      res.status(400).json(err);
    }
};

module.exports = {
  allAccounts,
  getTheAccount,
  creatNewAccount,
  updateAccount,
  deleteAccount,
};

