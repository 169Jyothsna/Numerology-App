const express = require("express");
const router = express.Router();
const User = require("../models/User");

const calculateLuckyNumber = (dob) => {
  const dobDate = new Date(dob);
  if (isNaN(dobDate)) {
    throw new Error("Invalid Date of Birth");
  }

  const daySum = dobDate
    .getDate()
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);
  const month = dobDate.getMonth() + 1;
  const yearSum = dobDate
    .getFullYear()
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);

  let luckyNumber = daySum + month + yearSum;
  while (luckyNumber > 9) {
    luckyNumber = luckyNumber
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return luckyNumber;
};

router.post("/luckyNumber", async (req, res) => {
  const { name, dob } = req.body;

  if (!name || !dob) {
    return res
      .status(400)
      .json({ message: "Name and Date of Birth are required" });
  }

  try {
    // Calculate the lucky number
    const luckyNumber = calculateLuckyNumber(dob);

    // Always create a new user entry
    const newUser = new User({
      name,
      dateOfBirth: dob,
      luckyNumber,
    });

    await newUser.save();

    // Send the response with the lucky number
    res.status(201).json({
      message: "New user created successfully!",
      luckyNumber,
    });
  } catch (error) {
    console.error("Error calculating lucky number:", error);
    res
      .status(500)
      .json({
        message: "Error calculating lucky number",
        error: error.message,
      });
  }
});

module.exports = router;
