const { History, User } = require("../models");

class HistoryController {
  static async get(req, res, next) {
    try {
      const histories = await History.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json({
        status: 200,
        data: histories,
        message: "Get data histories susscessfully",
      });
    } catch (error) {
      next({ status: 500, message: "Internal server error" });
    }
  }
}

module.exports = HistoryController;
