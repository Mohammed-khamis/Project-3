const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./../models/userModel');
const { check, validationResult } = require('express-validator');

exports.checkResults = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

exports.register = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json('The user already exist');

    const avatar = await gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    user.password = await bcrypt.hash(password, Number(process.env.SALT));

    await user.save();
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
