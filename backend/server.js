const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const luckyNumberRoutes = require("./routes/luckyNumberRoutes"); // Import lucky number routes

//Loading the environment variables
dotenv.config();

//Connecting to MongoDB
connectDB();

//Initializing the Express app
const app = express();

//Middleware
// Enabling CORS for cross-origin requests
app.use(cors({ origin: "*" }));
// Parsing JSON payloads
app.use(express.json());

//Defining the routes
//This route is used for user-related requests
app.use("/api/user", require("./routes/userRoutes"));
//This route is used for lucky number-related requests
app.use("/api", luckyNumberRoutes);

//Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
