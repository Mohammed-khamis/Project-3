const bcrypt = require("bcrypt");
const { findByIdAndUpdate } = require("../models/userModel");
const user = require("../models/userModel");
const User = require('../models/userModel');

const hashPassword = (password) => {
  return bcrypt.hash(password, Number(process.env.SALT));
};

const creatNewUser = async (req, res) => {
    try {
      const newUser = await User.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          user: newUser
        }
      });     
    } catch (err) {
        res.status(404).json({
          status: "fail",
          data: {
            message: "The User is already exist",
          },
        });
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
          status: "success",
          result: users.length,
          data: {
            user: users,
          },
        }); 
        
    } catch (err) {
        res.status(404).json({
          status: "fail",
          data: {
            message: err,
          },
        });
    }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    }); 

  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: {
        message: err,
      },
    });
  }
};

const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      res.status(200).json({
        status: "success",
        data: {
          user: user,
        },
      }); 

    } catch (err) {
      res.status(404).json({
        status: "fail",
        data: {
          message: err,
        },
      });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
          status: "success",
          data: {
            message: "The User has been deleted!",
          },
        }); 

    } catch (err) {
      res.status(404).json({
        status: "fail",
        data: {
          message: err,
        },
      });
    }
};

module.exports = {
  allUsers,
  getUser,
  creatNewUser,
  updateUser,
  deleteUser,
};

