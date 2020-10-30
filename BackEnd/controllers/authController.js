const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('./../models/userModel');
const { check, validationResult } = require('express-validator');

exports.protected = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(204).json('User maybe has been deleted');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.checkResults = [
  check('email', 'please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

exports.login = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json('Invalid Credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json('Invalid Credentials');

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    res.status(201).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
