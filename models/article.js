'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define(
    "article", 
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING(1000)
    }, 
    {}
  );
  article.associate = function(models) {
    article.belongsTo(models.user);
  };
  return article;
};