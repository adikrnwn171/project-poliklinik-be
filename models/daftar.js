"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Daftar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Daftar.belongsTo(models.JadwalPeriksa, {
        foreignKey: "idJadwal",
      });

      Daftar.belongsTo(models.Pasien, {
        foreignKey: "idPasien",
      });

      Daftar.hasOne(models.Periksa, {
        foreignKey: "idDaftar",
      });
    }
  }
  Daftar.init(
    {
      idPasien: DataTypes.INTEGER,
      idJadwal: DataTypes.INTEGER,
      keluhan: DataTypes.TEXT,
      queue: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Daftar",
    }
  );
  return Daftar;
};
