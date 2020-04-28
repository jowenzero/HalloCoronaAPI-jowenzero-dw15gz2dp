'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "lists", 
      [
        {
          name: "Patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], 
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("lists", null, {});
  }
};
