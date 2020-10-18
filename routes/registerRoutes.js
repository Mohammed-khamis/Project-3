const express = require("express");
const  {allAccounts,creatNewAccount,updateAccount,deleteAccount } = require('../Controller/registerController');

const authRouter = express.Router();



authRouter.get('/accounts', allAccounts);
authRouter.post("/signUp", creatNewAccount);
authRouter.put("/account/:name", updateAccount);
authRouter.delete('/account/:name', deleteAccount);


module.exports = authRouter;