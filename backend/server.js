const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const luckyNumberRoutes = require("./routes/luckyNumberRoutes"); // Import lucky number routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON payloads

// Define routes
app.use("/api/user", require("./routes/userRoutes")); // Route for user-related requests
app.use("/api", luckyNumberRoutes); // Route for lucky number-related requests

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
