const { Periksa, DetailPeriksa, sequelize } = require("../models");

const getPeriksa = async (req, res) => {
  try {
    const periksa = await Periksa.findAll({
      include: [
        {
          model: sequelize.model("Daftar"),
          attributes: ["keluhan", "queue"],
          include: [
            {
              model: sequelize.model("Pasien"),
              attributes: ["name", "rm"],
            },
            {
              model: sequelize.model("JadwalPeriksa"),
              attributes: ["hari", "jamMulai", "jamSelesai"],
              include: {
                model: sequelize.model("Dokter"),
                attributes: ["dokterName"],
              },
            },
          ],
        },
        {
          model: sequelize.model("DetailPeriksa"),
          attributes: ["idPeriksa", "idObat"],
          include: {
            model: sequelize.model("Obat"),
            attributes: ["id", "namaObat", "kemasan", "harga"],
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: periksa,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createPeriksa = async (req, res) => {
  const { periksaData, detailPeriksaData } = req.body;

  const t = await sequelize.transaction();

  try {
    const periksa = await Periksa.create(periksaData, { transaction: t });

    const detailPeriksaPromises = detailPeriksaData.map(detail => {
      return DetailPeriksa.create(
        {
          idPeriksa: periksa.id,
          idObat: detail.idObat,
          biaya: detail.biaya,
        },
        { transaction: t }
      );
    });
    await Promise.all(detailPeriksaPromises);

    await t.commit();
    res.status(201).json({
      status: "success",
      message: [periksaData, detailPeriksaData],
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getPeriksa,
  createPeriksa,
};
