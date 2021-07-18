const jwt = require("jsonwebtoken");

function signAccessToken(data) {
  const token = jwt.sign({ data }, process.env.SECRETE_KEY);
  return token;
}

module.exports = signAccessToken;
