const verifyAccessToken = require("../helpers/verifyAccessToken");
const { Food, User } = require("../models");

function authentication(req, res, next) {
  const user = verifyAccessToken(req.headers.access_token);
  if (user) {
    req.user = user;
    next();
  } else {
    next({ status: 401, message: "Please login first" });
  }
}

function authorization(req, res, next) {
  const user = verifyAccessToken(req.headers.access_token);
  Food.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ["role"],
    },
  })
    .then((data) => {
      if (user.data.role === "admin" || user.data.role === data.User.role) {
        next();
      } else {
        res.status(401).json({
          status: 401,
          message: "You don't have access 3",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    });
}

module.exports = { authentication, authorization };
