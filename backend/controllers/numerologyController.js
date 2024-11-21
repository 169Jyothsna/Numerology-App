const moment = require("moment");
const User = require("../models/User");

exports.calculateLuckyNumber = async (req, res) => {
  const { name, dateOfBirth } = req.body;

  if (!name || !dateOfBirth) {
    return res.status(400).json({ error: "Name and Date of Birth are required" });
  }

  // Parse and validate date
  const parsedDate = moment(dateOfBirth, ["YYYY-MM-DD", "DD-MM-YYYY"], true).toDate();
  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: "Invalid date format. Use DD-MM-YYYY or YYYY-MM-DD." });
  }

  // Calculate lucky number
  let sum = dateOfBirth
    .replace(/-/g, "")
    .split("")
    .reduce((acc, curr) => acc + parseInt(curr), 0);
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, curr) => acc + parseInt(curr), 0);
  }

  try {
    // Always create a new user
    const newUser = new User({
      name,
      dateOfBirth: parsedDate,
      luckyNumber: sum,
    });
    await newUser.save();

    res.status(201).json({
      luckyNumber: newUser.luckyNumber,
      message: "New user created successfully.",
    });
  } catch (error) {
    console.error("Error saving lucky number:", error);
    res.status(500).json({
      message: "Error calculating and saving lucky number",
      error: error.message,
    });
  }
};
