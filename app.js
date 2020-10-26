const express = require('express');
const morgan = require('morgan');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

module.exports = app;
