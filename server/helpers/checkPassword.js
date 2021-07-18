function checkPassword(password, hashPassword) {
  const bcrypt = require("bcryptjs");
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = checkPassword;
