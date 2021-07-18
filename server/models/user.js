"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Food, { foreignKey: "authorId" });
      User.hasMany(models.History, { foreignKey: "updatedBy" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name can't Empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: {
            msg: "Email can't Empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password can't Empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Role can't Empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
