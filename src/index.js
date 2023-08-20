// Import required modules
const express = require("express"); // Web framework for building APIs
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const createError = require("http-errors"); // Utility for creating HTTP error instances
const morgan = require("morgan"); // HTTP request logger middleware
const authRoutes = require("./routes/auth.routes"); // Import authentication routes
require("dotenv").config(); // Load environment variables from .env file
require("./db/db")

/**
 * NOT implementing protected error messages
 * the error messages are default from JOI validation
 * assuming the app is still in a development enviournment
 */

// Create an instance of the Express application
const app = express();

// Define the port to listen on, using environment variable or defaulting to 8080
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Use morgan for logging HTTP requests in "dev" format

// Mount authentication routes under the "/api/auth" path
app.use("/api/auth", authRoutes);

// Default route handling
app.get("/", async (req, res, next) => {
  res.status(200).send("This app is currently functional"); // Respond with a 200 OK status and a message
});

// Middleware for handling 404 (Not Found) errors
app.use((req, res, next) => {
  next(createError.NotFound("Resource Not Found!!")); // Generate a 404 error and pass it to the next middleware
});

// Error handling middleware for handling all other errors
app.use((err, req, res, next) => {
  // Respond with an error status and JSON containing error details
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});


// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
