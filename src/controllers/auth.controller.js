const createError = require("http-errors");
const User = require("../models/user.model");
const tokenManager = require("../utils/helpers/tokenManager");
const {
  registrationSchema,
  loginSchema,
} = require("../utils/validation/userValidation");

// Controller to handle user registration
const registerUser = async (req, res, next) => {
  try {
    // Validate the request body against the registration schema
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    // Destructure user data from request body
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      birthDate,
    } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "User already exists"));
    }

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      birthDate,
    });

    // Save the user to the database
    await user.save();

    // Generate tokens
    const accessToken = tokenManager.generateAccessToken(user);
    const refreshToken = tokenManager.generateRefreshToken(user);

    // Respond with success message and tokens
    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to handle user login
const loginUser = async (req, res, next) => {
  try {
    // Validate the request body against the login schema
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    // Destructure user credentials from request body
    const { email, password } = req.body;

    // Find the user by their email address
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, "Invalid credentials"));
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(createError(401, "Invalid credentials"));
    }

    // Generate tokens
    const accessToken = tokenManager.generateAccessToken(user);
    const refreshToken = tokenManager.generateRefreshToken(user);

    // Respond with success message and tokens
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to handle user logout (no logic for token invalidation)
const logoutUser = (req, res, next) => {
  try {
    // Simple cookie removal on the frontend
    res.status(200).send("Logout success!");
  } catch (error) {
    next(error);
  }
};

// Controller to refresh access token using refresh token
const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // Verify the refresh token and extract user data from the payload
    const userData = tokenManager.verifyRefreshToken(refreshToken);
    if (!userData) {
      return next(createError(401, "Unauthorized"));
    }

    // Generate a new access token using the extracted user data
    const newAccessToken = tokenManager.generateAccessToken(userData);

    // Respond with the new access token
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
