const { Category } = require("../models");

class CategoryController {
  static async get(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json({
        status: 200,
        data,
        message: "Get data category successfully",
      });
    } catch (error) {
      next({ status: 404, message: "Data Category not found" });
    }
  }
}

module.exports = CategoryController;
