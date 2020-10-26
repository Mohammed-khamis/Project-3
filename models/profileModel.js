const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company: {
    type: String,
  },
  job: {
    type: String,
  },
  fieldOfStudy: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
});

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;
