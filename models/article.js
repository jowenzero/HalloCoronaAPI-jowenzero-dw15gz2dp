'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define(
    "article", 
    {
      title: DataTypes.STRING,
      tags: {
        type: DataTypes.STRING,
        set(value) {
          return this.setDataValue("tags", value.toString());
        },
        get() {
          return this.getDataValue("tags") && this.getDataValue("tags").split(",")
        }
      },
      description: DataTypes.STRING(3000)
    }, 
    {}
  );
  article.associate = function(models) {
    article.belongsTo(models.user);
  };
  return article;
};