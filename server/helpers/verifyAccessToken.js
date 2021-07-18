const jwt = require("jsonwebtoken");

function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    return decoded;
  } catch (error) {
    return false;
  }
}

module.exports = verifyAccessToken;
