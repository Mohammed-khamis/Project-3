const express = require("express");
const morgan = require("morgan");

const AppError  = require('./utils/appError');
const globalErrorHandler = require('./Controller/errorController');
const registerRouter = require('./routes/registerRoutes');


const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(registerRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);


module.exports = app;
