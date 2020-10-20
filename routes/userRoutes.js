const express = require("express");
const {allUsers,getUser,creatNewUser,updateUser,deleteUser,} = require("../Controller/userController");

const authRouter = express.Router();



authRouter.get('/users', allUsers);
authRouter.get("/user/:id", getUser);
authRouter.post("/creatUser", creatNewUser);
authRouter.put("/user/:id", updateUser);
authRouter.delete('/user/:id', deleteUser);


module.exports = authRouter;