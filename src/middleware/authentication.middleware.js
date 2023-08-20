const tokenManager = require('../utils/helpers/tokenManager')

// Middleware to authenticate requests with an access token
const authenticateAccessToken = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Unauthorized access: Missing authorization header" });
  }

  const accessToken = authorizationHeader.split(" ")[1];
  //console.log(authorizationHeader)

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized access: Access token missing" });
  }

  const userData = tokenManager.verifyAccessToken(accessToken);
  if (!userData) {
    return res.status(401).json({ message: "Unauthorized access: Invalid access token" });
  }

  // Attach the user ID to the request object
  req.userId = userData.userId;

  next();
};


module.exports = {
  authenticateAccessToken,
};
