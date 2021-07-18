"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Food", "status", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Food", "status", {});
  },
};
