"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.Category, { foreignKey: "categoryId" });
      Food.belongsTo(models.User, { foreignKey: "authorId" });
      Food.hasMany(models.History, { foreignKey: "entityId" });
    }
  }
  Food.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name can't Empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Description can't Empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1000,
            msg: "Minimum price is 1000",
          },
          notEmpty: {
            msg: "Price can't Empty",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "imgUrl is not URL",
          },
          notEmpty: {
            msg: "imgUrl can't Empty",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "authorId can't Empty",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "categoryId can't Empty",
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
