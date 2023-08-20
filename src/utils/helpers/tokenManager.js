const jwt = require("jsonwebtoken");

// Helper function to generate a token
const generateToken = (user, secret, duration) => {
  const userData = {
    userId: user?._id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  };
  return jwt.sign(userData, secret, {
    expiresIn: duration,
  });
};

// Helper function to verify a token
const verifyToken = (token, secret) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    console.log(decodedToken)
    return decodedToken;
  } catch (error) {
    return null;
  }
};

// Generate an access token for a user
const generateAccessToken = (user) => {
  return generateToken(user, process.env.JWT_ACCESS_TOKEN_SECRET, "1h");
};

// Generate a refresh token for a user
const generateRefreshToken = (user) => {
  return generateToken(user, process.env.JWT_REFRESH_TOKEN_SECRET, "7d");
};

// Verify an access token
const verifyAccessToken = (accessToken) => {
  return verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
};

// Verify a refresh token
const verifyRefreshToken = (refreshToken) => {
  return verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
  };