const tokenManager = require('../utils/helpers/tokenManager')

// Middleware to authenticate requests with an access token
const authenticateAccessToken = (req, res, next) => {
  const accessToken = req.header("Authorization").split(" ")[1]; // Assuming the token is sent in the "Authorization" header

  if (!accessToken) {
    return res.status(401).json({ message: "Access token missing" });
  }

  const userData = tokenManager.verifyAccessToken(accessToken);
  if (!userData) {
    return res.status(401).json({ message: "Invalid access token" });
  }

  // Attach the user ID to the request object
  req.userId = userData?.userId;

  next();
};

module.exports = {
  authenticateAccessToken,
};
