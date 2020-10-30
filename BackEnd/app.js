const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const postRouter = require('./routes/postRoutes');
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postRouter);

module.exports = app;
