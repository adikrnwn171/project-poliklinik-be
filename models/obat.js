"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Obat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Obat.hasMany(models.DetailPeriksa, {
        foreignKey: "idObat",
      });
    }
  }
  Obat.init(
    {
      namaObat: DataTypes.STRING,
      kemasan: DataTypes.STRING,
      harga: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Obat",
    }
  );
  return Obat;
};
