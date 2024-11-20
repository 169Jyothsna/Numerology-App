const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  luckyNumber: {
    type: Number,
    required: true,
  },
});

// Create a unique composite index on name and dateOfBirth
userSchema.index({ name: 1, dateOfBirth: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;