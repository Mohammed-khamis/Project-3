const express = require("express");
const morgan = require("morgan");


const registerRouter = require('./routes/registerRoutes');


const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(registerRouter);

module.exports = app;
