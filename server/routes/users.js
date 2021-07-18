const express = require("express");
const UserController = require("../controllers/userController");
const users = express.Router();

users.get("/", UserController.get);

module.exports = users;
