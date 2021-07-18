const UserController = require("../controllers/userController");
const categories = require("./categories");
const foods = require("./foods");
const multer = require("multer");
const users = require("./users");
const { authentication } = require("../middlewares/auth");
const express = require("express");
const HistoryController = require("../controllers/historyController");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Home Page");
});

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.post("/google-login", UserController.googleLogin);

routes.use(authentication);
routes.use("/categories", categories);
routes.use("/foods", foods);
routes.use("/users", users);
routes.get("/histories", HistoryController.get);

routes.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      err.status = 400;
      err.message = "Image too large, max size is 255 kb";
      delete err.storageErrors;
      delete err.field;
      delete err.name;
      delete err.code;
    }
  }
  delete err.storageErrors;
  console.log(err);
  res.status(err.status).json(err);
});

module.exports = routes;
