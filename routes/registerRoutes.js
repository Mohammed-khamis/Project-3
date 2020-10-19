const express = require("express");
const  {allAccounts,creatNewAccount,updateAccount,deleteAccount } = require('../Controller/registerController');

const authRouter = express.Router();



authRouter.get('/accounts', allAccounts);
authRouter.post("/signUp", creatNewAccount);
authRouter.put("/account/:id", updateAccount);
authRouter.delete('/account/:id', deleteAccount);


module.exports = authRouter;