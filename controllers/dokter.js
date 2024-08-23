const { Dokter, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const decodeToken = require("../utils/decodeToken");
const poli = require("../models/poli");
const { where } = require("sequelize");
const imagekit = require("../lib/imageKit");

const getAllDokter = async (req, res) => {
  try {
    const payload = await Dokter.findAll({
      include: {
        model: sequelize.model("Poli"),
        attributes: ["namaPoli"],
      },
    });

    res.status(200).json({
      status: "success",
      data: payload,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { dokterName, email, password, address, phone, idPoli } = req.body;
    const file = req.file;

    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    });

    const dokter = await Dokter.findOne({ where: { email } });
    if (dokter) {
      return res.status(400).json({ message: "Email already used" });
    }

    hashedPassword = bcrypt.hashSync(password, 10);

    const newDokter = await Dokter.create({
      dokterName,
      email,
      password: hashedPassword,
      address,
      phone,
      idPoli,
      imgUrl: img.url,
    });

    res.status(201).json({
      status: "success",
      data: newDokter,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dokter = await Dokter.findOne({
      where: { email },
    });

    if (!dokter) {
      return res.status(404).send({ message: "User not found" });
    }

    if (dokter && bcrypt.compareSync(password, dokter.password)) {
      const token = jwt.sign(
        {
          id: dokter.id,
          username: dokter.dokterName,
          email: dokter.email,
          role: "dokter",
        },
        "rahasia"
      );

      return res.status(200).json({
        status: "success",
        data: {
          username: dokter.dokterName,
          email: dokter.email,
          token,
        },
      });
    }

    return res.status(400).send({ message: "Password is incorrect" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const showDokter = async (req, res) => {
  try {
    const decodedToken = decodeToken(req.headers.authorization);
    const dokterId = decodedToken.id;

    const dokter = await Dokter.findByPk(dokterId, {
      include: [
        {
          model: sequelize.model("Poli"),
          attributes: ["id", "namaPoli"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: dokter,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateDokter = async (req, res) => {
  try {
    const { dokterName, email, password, address, phone, idPoli } = req.body;
    const file = req.file;

    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    });

    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decodedToken = decodeToken(req.headers.authorization);
    const dokterId = decodedToken.id;

    const dokter = await Dokter.findByPk(dokterId);

    const hashedPassword = bcrypt.hashSync(password, 10);

    dokter.dokterName = dokterName;
    dokter.email = email;
    dokter.password = hashedPassword;
    dokter.address = address;
    dokter.phone = phone;
    dokter.idPoli = idPoli;
    dokter.imgUrl = img.url;
    await dokter.save();

    res.status(200).json({
      status: "success",
      message: dokter,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteDokter = async (req, res) => {
  try {
    const id = req.params.id;

    const dokter = await Dokter.findByPk(id);

    if (!dokter) {
      return res.status(404).send({ message: "Dokter not found" });
    }

    await dokter.destroy({
      where: { id },
    });

    res.status(200).json({
      status: "success",
      message: `Dokter with ID ${id} has been deleted`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllDokter,
  register,
  login,
  showDokter,
  updateDokter,
  deleteDokter,
};
