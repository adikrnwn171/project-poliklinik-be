const { Obat } = require("../models");

const getObat = async (req, res) => {
  try {
    const obat = await Obat.findAll();

    res.status(200).json({
      status: "success",
      message: obat,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createObat = async (req, res) => {
  try {
    const { namaObat, kemasan, harga } = req.body;
    const newObat = await Obat.create({
      namaObat,
      kemasan,
      harga,
    });

    res.status(201).json({
      status: "success",
      data: newObat,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getObat,
  createObat,
};
