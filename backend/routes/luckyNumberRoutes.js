const express = require("express");
const router = express.Router();
const User = require("../models/User");

const calculateLuckyNumber = (dob) => {
  const dobDate = new Date(dob);
  if (isNaN(dobDate)) {
    throw new Error("Invalid Date of Birth");
  }

  const daySum = dobDate.getDate().toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  const month = dobDate.getMonth() + 1;
  const yearSum = dobDate.getFullYear().toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);

  let luckyNumber = daySum + month + yearSum;
  while (luckyNumber > 9) {
    luckyNumber = luckyNumber.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return luckyNumber;
};

router.post("/luckyNumber", async (req, res) => {
  const { name, dob } = req.body;

  if (!name || !dob) {
    return res.status(400).json({ message: "Name and Date of Birth are required" });
  }

  try {
    const luckyNumber = calculateLuckyNumber(dob);

    let user = await User.findOne({ dateOfBirth: dob });
    if (user) {
      user.luckyNumber = luckyNumber;
      user.name = name; // Update name
      await user.save();
    } else {
      user = new User({ name, dateOfBirth: dob, luckyNumber });
      await user.save();
    }

    res.status(200).json({ luckyNumber });
  } catch (error) {
    console.error("Error calculating lucky number:", error);
    res.status(500).json({ message: "Error calculating lucky number", error: error.message });
  }
});

module.exports = router;
