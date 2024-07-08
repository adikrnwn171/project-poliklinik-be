"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailPeriksa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailPeriksa.belongsTo(models.Periksa, {
        foreignKey: "idPeriksa",
      });

      DetailPeriksa.belongsTo(models.Obat, {
        foreignKey: "idObat",
      });
    }
  }
  DetailPeriksa.init(
    {
      idPeriksa: DataTypes.INTEGER,
      idObat: DataTypes.INTEGER,
      biaya: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailPeriksa",
    }
  );
  return DetailPeriksa;
};
