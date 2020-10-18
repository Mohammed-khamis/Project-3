const registerRouter = require('./routes/register');
const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(registerRouter);


module.exports = app;
