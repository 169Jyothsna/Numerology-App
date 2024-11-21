const mongoose = require("mongoose");

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

// Removed any unique index constraints

const User = mongoose.model("User", userSchema);

module.exports = User;
