const express = require("express");
const { allUsers,getUser,creatNewUser,updateUser,deleteUser } = require("../Controller/userController");
const { signUp, login } = require('../Controller/authController');

const authRouter = express.Router();



authRouter.post('/signUp', signUp)
authRouter.post("/login", login);



authRouter.get('/users', allUsers);
authRouter.get("/user/:id", getUser);
authRouter.post("/creatUser", creatNewUser);
authRouter.put("/user/:id", updateUser);
authRouter.delete('/user/:id', deleteUser);


module.exports = authRouter;