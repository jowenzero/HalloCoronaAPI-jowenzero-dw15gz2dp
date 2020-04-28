'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user", 
    {
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ["Male", "Female"],
        defaultValue: "Male",
      },
      phone: DataTypes.STRING,
      address: DataTypes.STRING
    }, 
    {}
  );
  user.associate = function(models) {
    user.belongsTo(models.list);
  };
  return user;
};