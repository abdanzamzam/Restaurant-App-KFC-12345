"use strict";

const hashPassword = require("../helpers/hashPassword");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = require("../data/users.json");
    data.forEach((el) => {
      el.password = hashPassword(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
