const decodeToken = require("../utils/decodeToken");
const { JadwalPeriksa, sequelize } = require("../models");
const { where } = require("sequelize");

const createJadwal = async (req, res) => {
  try {
    const { hari, jamMulai, jamSelesai, active } = req.body;
    const decodedToken = decodeToken(req.headers.authorization);
    const dokterId = decodedToken.id;

    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const cek = await JadwalPeriksa.findAll({
      where: {
        idDokter: dokterId,
        active: true,
      },
    });

    if (cek.length > 1 && active == "true") {
      return res.status(400).json({
        message: "Only two schedules can be activated",
      });
    }

    const newJadwal = await JadwalPeriksa.create({
      idDokter: dokterId,
      hari,
      jamMulai,
      jamSelesai,
      active,
    });

    res.status(201).json({
      status: "success",
      message: newJadwal,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalPeriksa.findAll({
      include: {
        model: sequelize.model("Dokter"),
        attributes: ["dokterName", "phone"],
        include: {
          model: sequelize.model("Poli"),
          attributes: ["namaPoli"],
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: jadwal,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const showJadwal = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decodedToken = decodeToken(req.headers.authorization);
    const dokterId = decodedToken.id;

    const jadwal = await JadwalPeriksa.findAll({
      where: { idDokter: dokterId },
    });

    if (!jadwal) {
      return res.status(404).json({ message: "Jadwal not found" });
    }

    res.status(200).json({
      message: "success",
      data: jadwal,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateJadwal = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { active } = req.body;
    const id = req.params.id;

    const decodedToken = decodeToken(req.headers.authorization);
    const dokterId = decodedToken.id;

    const jadwal = await JadwalPeriksa.findOne({
      where: {
        id,
        idDokter: dokterId,
      },
    });

    if (!jadwal) {
      return res.status(404).json({ message: "Jadwal not found" });
    }

    const cek = await JadwalPeriksa.findAll({
      where: {
        idDokter: dokterId,
        active: true,
      },
    });

    if (cek.length > 1 && active == true) {
      return res.status(400).json({
        message: "Only two schedules can be activated",
      });
    }

    jadwal.active = active;
    await jadwal.save();

    res.status(200).json({
      status: "success",
      message: "Jadwal has been change",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createJadwal,
  getAllJadwal,
  showJadwal,
  updateJadwal,
};
