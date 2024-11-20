const User = require("../models/User");

exports.calculateLuckyNumber = async (req, res) => {
  const { name, dateOfBirth } = req.body;

  if (!name || !dateOfBirth) {
    return res
      .status(400)
      .json({ error: "Name and Date of Birth are required" });
  }

  const parsedDate = new Date(dateOfBirth);
  if (isNaN(parsedDate)) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use YYYY-MM-DD format." });
  }

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
    let user = await User.findOne({ dateOfBirth: parsedDate });

    if (user) {
      user.luckyNumber = sum;
      user.name = name;
      await user.save();
    } else {
      user = new User({ name, dateOfBirth: parsedDate, luckyNumber: sum });
      await user.save();
    }

    res.json({ luckyNumber: user.luckyNumber });
  } catch (error) {
    console.error("Error saving lucky number:", error);
    res
      .status(500)
      .json({ message: "Error calculating and saving lucky number" });
  }
};
