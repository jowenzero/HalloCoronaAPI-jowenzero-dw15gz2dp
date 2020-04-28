'use strict';
module.exports = (sequelize, DataTypes) => {
  const consultation = sequelize.define(
    "consultation", 
    {
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      bornDate: DataTypes.DATE,
      age: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      gender: {
        type: DataTypes.ENUM,
        values: ["Male", "Female"],
        defaultValue: "Male",
      },
      subject: DataTypes.STRING,
      liveConsult: DataTypes.DATE,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["Waiting Approve Live Consultation", "Waiting Live Consultation", "Cancel"],
        defaultValue: "Waiting Approve Live Consultation",
      },
    }, 
    {}
  );
  consultation.associate = function(models) {
    consultation.belongsTo(models.user);
    consultation.hasMany(models.reply);
  };
  return consultation;
};