const express = require("express");
const registerRouter = require('./routes/register');
require("dotenv").config();

const app = express();

//Middlewares
app.use(express.json());
app.use(registerRouter);


module.exports = app;
