const express = require("express");
const authController = require("../controllers/auth.controller");


const router = express.Router();

// Route for user registration
router.post("/register", authController.registerUser);

// Route for user login 
router.post("/login", authController.loginUser);

// Route for refreshing access token
router.post("/refresh-token", authController.refreshAccessToken);

// Route for user logout (with verifyAccessToken middleware)
router.post("/logout", authController.logoutUser);

module.exports = router;
