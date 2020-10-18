const express = require("express");
const bcrypt = require("bcrypt");
const accounts = require("../Database/accounts");

const authRouter = express.Router();

const allAccounts = (req, res) => {
    res.json(accounts);
};

const creatNewAccount = async (req, res) => {
    const account = {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        posts:[],
        friends:[]
    };
    accounts.push(account);
    res.json(account);
};

const updateAccount = (req, res) => {
    res.json(accounts);
};

const deleteAccount = (req, res) => {
    res.json("account");
};

const hashPassword = (password) => {
    return bcrypt.hash(password, Number(process.env.SALT));
};


authRouter.get('/accounts', allAccounts);
authRouter.post("/signUp", creatNewAccount);
authRouter.patch("/account/:name", updateAccount);
authRouter.delete('/account/:name', deleteAccount);



module.exports = authRouter;