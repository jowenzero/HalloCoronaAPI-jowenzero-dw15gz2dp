'use strict';
module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define(
    "reply", 
    {
      response: DataTypes.STRING
    }, 
    {}
  );
  reply.associate = function(models) {
    reply.belongsTo(models.consultation);
  };
  return reply;
};