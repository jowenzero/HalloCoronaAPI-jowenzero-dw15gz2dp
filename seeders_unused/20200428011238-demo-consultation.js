'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "consultations", 
      [
        {
          fullName: "Ray Collins",
          phone: "0812-3749-3827",
          bornDate: new Date("2001-03-09"),
          age: 21,
          height: 175,
          weight: 60,
          gender: "Male",
          subject: "Sakit Kepala",
          liveConsult: new Date("2020-05-03"),
          description: "Sakit Kepala",
          userId: 1,
          status: "Waiting Approve Live Consultation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Kiyazi Nishigami",
          phone: "0895-4842-8721",
          bornDate: new Date("2002-05-17"),
          age: 20,
          height: 185,
          weight: 70,
          gender: "Male",
          subject: "Sakit Perut",
          liveConsult: new Date("2020-05-04"),
          description: "Sakit Perut",
          status: "Waiting Approve Live Consultation",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Kiyazi Nishigami",
          phone: "0895-4842-8721",
          bornDate: new Date("2002-05-17"),
          age: 20,
          height: 185,
          weight: 70,
          gender: "Male",
          subject: "Masuk Angin",
          liveConsult: new Date("2020-05-04"),
          description: "Sakit Perut",
          status: "Waiting Approve Live Consultation",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], 
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("consultations", null, {});
  }
};
