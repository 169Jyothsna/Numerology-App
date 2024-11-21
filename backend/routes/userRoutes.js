const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to create a new user
router.post("/users", userController.createUser);

// Route to get a user by ID
router.get("/users/:id", userController.getUserById);

router.get("/users", userController.getAllUsers);

module.exports = router;
