const express = require("express");
const registerRouter = require('./routes/registerRoutes');
require("dotenv").config();

const app = express();

//Middlewares
app.use(express.json());
app.use(registerRouter);


module.exports = app;
