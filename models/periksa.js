"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Periksa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Periksa.belongsTo(models.Daftar, {
        foreignKey: "idDaftar",
      });

      Periksa.hasMany(models.DetailPeriksa, {
        foreignKey: "idPeriksa",
      });
    }
  }
  Periksa.init(
    {
      idDaftar: DataTypes.INTEGER,
      tglPeriksa: DataTypes.DATE,
      catatan: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Periksa",
    }
  );
  return Periksa;
};
