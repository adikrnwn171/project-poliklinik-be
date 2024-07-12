"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pasien.hasMany(models.Daftar, {
        foreignKey: "idPasien",
      });
    }
  }
  Pasien.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      idNumber: DataTypes.STRING,
      phone: DataTypes.STRING,
      rm: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      otp: DataTypes.INTEGER,
      imgUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Pasien",
    }
  );
  return Pasien;
};
