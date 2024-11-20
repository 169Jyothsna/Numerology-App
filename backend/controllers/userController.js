const User = require("../models/User");

// Controller to create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, dateOfBirth } = req.body;

    if (!name || !dateOfBirth) {
      return res.status(400).json({ message: "Name and Date of Birth are required" });
    }

    const newUser = new User({ name, dateOfBirth, luckyNumber: null }); // Lucky number to be calculated separately
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    // Check for unique constraint error
    if (error.code === 11000) {
      return res.status(400).json({ message: "A user with the same name and date of birth already exists" });
    }
    // Handle other errors
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};