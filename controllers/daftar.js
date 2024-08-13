const { where } = require("sequelize");
const { Daftar, Pasien, sequelize } = require("../models");
const decodeToken = require("../utils/decodeToken");
const nextQueue = require("../utils/queue");

const getDaftar = async (req, res) => {
  try {
    const payload = await Daftar.findAll({
      include: [
        {
          model: sequelize.model("Pasien"),
          attributes: ["name", "phone", "rm"],
        },
        {
          model: sequelize.model("JadwalPeriksa"),
          attributes: ["hari", "jamMulai", "jamSelesai"],
          include: {
            model: sequelize.model("Dokter"),
            attributes: ["dokterName"],
            include: {
              model: sequelize.model("Poli"),
              attributes: ["namaPoli"],
            },
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: payload,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getDaftarById = async (req, res) => {
  try {
    const decodedToken = decodeToken(req.headers.authorization);
    const userId = decodedToken.id;

    const payload = await Daftar.findAll({
      where: { idPasien: userId },
      include: [
        {
          model: sequelize.model("Pasien"),
          attributes: ["name", "phone", "rm"],
        },
        {
          model: sequelize.model("JadwalPeriksa"),
          attributes: ["hari", "jamMulai", "jamSelesai"],
          include: {
            model: sequelize.model("Dokter"),
            attributes: ["dokterName"],
            include: {
              model: sequelize.model("Poli"),
              attributes: ["namaPoli"],
            },
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: payload,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createDaftar = async (req, res) => {
  const { idPasien, idJadwal, keluhan } = req.body;
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const decodedToken = decodeToken(req.headers.authorization);
    const userId = decodedToken.id;

    const pasien = await Pasien.findByPk(userId);

    if (!pasien) {
      return res.status(404).send({ message: "User not found" });
    }

    const queue = await nextQueue();

    const newDaftar = await Daftar.create({
      idPasien: userId,
      idJadwal,
      keluhan,
      queue: queue,
    });

    res.status(201).json({
      message: "success",
      data: newDaftar,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getDaftar,
  createDaftar,
  getDaftarById,
};
