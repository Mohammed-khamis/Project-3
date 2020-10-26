const Profile = require('./../models/profileModel');
const User = require('./../models/userModel');
const { check, validationResult } = require('express-validator');

exports.checkResults = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);
    if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' });
    res.json(profile);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProfile = async (req, res) => {
  const { company, job, fieldOfStudy, location, bio, dateOfBirth, phoneNumber } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (job) profileFields.job = job;
  if (fieldOfStudy) profileFields.fieldOfStudy = fieldOfStudy;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
  if (phoneNumber) profileFields.phoneNumber = phoneNumber;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
