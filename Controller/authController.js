const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");


require("dotenv").config();

/*const signToken = (id) => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });     
}*/

const signUp = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }); 

        res.status(201).json({
            status: "success",
            token,
            data: {
            user: newUser,
            },
        });

    } catch (err) {
      res.status(400).json({
        status: "fail",
        data: {
          message: err,
        },
      });
    }
};


const login = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return next(new AppError("Please provide email and password", 400));
        
        const user = await User.findOne({ email }).select('+password');
        const passwordCheck = await user.correctPassword(password, user.password);
        if (!user || !passwordCheck) return next(new AppError("Incorrect email or password", 401));
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }); 

        //const token = signToken(user._id);
        
        res.status(201).json({
          status: "success",
          token
        });

    } catch(err) {
        res.status(400).json({
        status: "fail",
        data: {
          message: err,
        },
      });
    }
};

module.exports = {
    signUp,
    login,
}


/*const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });*/