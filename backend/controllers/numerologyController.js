const moment = require("moment");
const User = require("../models/User");

exports.calculateLuckyNumber = async (req, res) => {
  const { name, dateOfBirth } = req.body;

  if (!name || !dateOfBirth) {
    return res.status(400).json({ error: "Name and Date of Birth are required" });
  }

  // Parse the date in both formats
  const parsedDate =
    moment(dateOfBirth, "YYYY-MM-DD", true).isValid()
      ? moment(dateOfBirth, "YYYY-MM-DD").toDate()
      : moment(dateOfBirth, "DD-MM-YYYY").toDate();

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
    // Check for existing user with the same name and dateOfBirth
    let existingUser = await User.findOne({ name, dateOfBirth: parsedDate });

    if (existingUser) {
      // If both name and dateOfBirth match, update the lucky number
      existingUser.luckyNumber = sum;
      await existingUser.save();
      return res.status(200).json({
        luckyNumber: existingUser.luckyNumber,
        message: "Lucky number updated for the existing user.",
      });
    }

    // Check for users with the same dateOfBirth but different names
    let sameDobUser = await User.findOne({ dateOfBirth: parsedDate });

    if (sameDobUser) {
      // Inform the user that the name-dob combination is unique
      return res.status(400).json({
        error: "A user with the same date of birth but a different name exists.",
      });
    }

    // Create a new user if no matches found
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
