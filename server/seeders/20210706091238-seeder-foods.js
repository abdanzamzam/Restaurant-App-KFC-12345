"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = require("../data/foods.json");
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Food", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Food", null, {});
  },
};
