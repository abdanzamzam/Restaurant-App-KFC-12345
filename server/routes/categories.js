const CategoryController = require("../controllers/categoryController");
const express = require("express");
const categories = express.Router();

categories.get("/", CategoryController.get);

module.exports = categories;
