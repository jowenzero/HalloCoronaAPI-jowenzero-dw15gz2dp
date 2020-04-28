'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "replies", 
      [
        {
          response: "Ok. Noted Ray. Here is the consultation",
          consultationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          response: "Ok. Noted Kiyazi. Here is the consultation",
          consultationId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          response: "Thanks! (Ray)",
          consultationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          response: "Thanks! (Kiyazi)",
          consultationId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], 
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("replies", null, {});
  }
};
