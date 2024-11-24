const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// This route creates a new user by calling the createUser method from the userController
router.post("/users", userController.createUser);

// This route fetches a user by their ID by calling the getUserById method from the userController
router.get("/users/:id", userController.getUserById);

// This route fetches all users by calling the getAllUsers method from the userController
router.get("/users", userController.getAllUsers);

module.exports = router;
