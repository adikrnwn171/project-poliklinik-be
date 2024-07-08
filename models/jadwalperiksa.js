"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JadwalPeriksa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JadwalPeriksa.belongsTo(models.Dokter, {
        foreignKey: "idDokter",
      });

      JadwalPeriksa.hasMany(models.Daftar, {
        foreignKey: "idPasien",
      });
    }
  }
  JadwalPeriksa.init(
    {
      idDokter: DataTypes.INTEGER,
      hari: DataTypes.ENUM([
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ]),
      jamMulai: DataTypes.TIME,
      jamSelesai: DataTypes.TIME,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "JadwalPeriksa",
    }
  );
  return JadwalPeriksa;
};
