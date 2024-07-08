"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dokter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dokter.belongsTo(models.Poli, {
        foreignKey: "idPoli",
      });

      Dokter.hasMany(models.JadwalPeriksa, {
        foreignKey: "idDokter",
      });
    }
  }
  Dokter.init(
    {
      dokterName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      idPoli: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Dokter",
    }
  );
  return Dokter;
};
