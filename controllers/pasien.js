const { where } = require("sequelize");
const { Pasien } = require("../models");
const rmGenerator = require("../utils/rmGenerator");
const bcrypt = require("bcrypt");
const otpGenerator = require("../utils/otpGenerator");
const sendOtp = require("../utils/sendOtp");
const jwt = require("jsonwebtoken");
const decodeToken = require("../utils/decodeToken");
const sendResetPassword = require("../utils/sendResetPassword");
const imagekit = require("../lib/imageKit");

const getAllPasien = async (req, res) => {
  try {
    const payload = await Pasien.findAll();
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
    const { name, email, password, address, idNumber, phone } = req.body;
    const file = req.file;

    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    });

    const pasien = await Pasien.findOne({ where: { email: req.body.email } });
    if (pasien) {
      return res.status(400).json({ message: "Email already used" });
    }

    const yearMonth = new Date().toISOString().slice(0, 7).replace("-", "");
    const rm = await rmGenerator(yearMonth);

    const otp = otpGenerator();
    await sendOtp(email, otp);

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newPasien = await Pasien.create({
      name,
      email,
      password: hashedPassword,
      address,
      idNumber,
      phone,
      rm,
      otp,
      imgUrl: img.url,
    });

    res.status(201).json({
      status: "success",
      data: newPasien,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const pasien = await Pasien.findOne({ where: { email: email } });
    if (!pasien) {
      return res.status(404).send({ message: "User not found" });
    }

    if (otp != pasien.otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    pasien.verified = true;
    await pasien.save();

    res.status(200).json({
      status: "success",
      message: "OTP verification successful",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pasien = await Pasien.findOne({
      where: {
        email,
      },
    });

    if (!pasien) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!pasien.verified) {
      return res.status(401).send({ message: "User is not verified" });
    }

    if (pasien && bcrypt.compareSync(password, pasien.password)) {
      const token = jwt.sign(
        {
          id: pasien.id,
          username: pasien.name,
          email: pasien.email,
        },
        "rahasia"
      );

      return res.status(200).json({
        status: "success",
        data: {
          username: pasien.name,
          email: pasien.email,
          token,
        },
      });
    }

    return res.status(400).send({ message: "Password is incorrect" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const decodedToken = decodeToken(req.headers.authorization);
    const userId = decodedToken.id;

    const pasien = await Pasien.findByPk(userId);
    res.status(200).json({
      status: "success",
      data: pasien,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password, address, idNumber, phone } = req.body;
    const file = req.file;

    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    });

    if (!req.headers.authorization) {
      return res.status(401).send({ message: "You dont have authorized" });
    }
    const decodedToken = decodeToken(req.headers.authorization);
    const userId = decodedToken.id;

    const pasien = await Pasien.findByPk(userId);

    if (!pasien) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    pasien.name = name;
    pasien.email = email;
    pasien.password = hashedPassword;
    pasien.address = address;
    pasien.idNumber = idNumber;
    pasien.phone = phone;
    pasien.imgUrl = img.url;

    await pasien.save();

    res.status(200).json({
      status: "success",
      data: pasien,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const linkResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const pasien = await Pasien.findOne({
      where: { email },
    });

    if (!pasien) {
      return res.status(404).send({ message: "User not found" });
    }

    const resetToken = jwt.sign({ email: pasien.email }, "rahasia", {
      expiresIn: "1h",
    });

    const linkReset = `https://google.com?token=${resetToken}`;
    await sendResetPassword(pasien.email, linkReset);

    res.status(200).json({
      status: "success",
      data: pasien,
      message: "Reset password link has been sent to your email",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decodedToken = jwt.verify(token, "rahasia");

    const email = decodedToken.email;

    const pasien = await Pasien.findOne({
      where: { email },
    });

    if (!pasien) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    pasien.password = hashedPassword;
    await pasien.save();

    res.status(200).json({
      status: "success",
      message: "Password has been reset",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const decodedToken = decodeToken(req.headers.authorization);
    const id = decodedToken.id;

    const pasien = await Pasien.findByPk(id);

    if (!pasien) {
      return res.status(404).send({ message: "User not found" });
    }

    await pasien.destroy({
      where: { id },
    });

    res.status(200).json({
      status: "success",
      message: `User with id ${id} has been deleted`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllPasien,
  register,
  verifyOTP,
  login,
  getUserByToken,
  update,
  linkResetPassword,
  resetPassword,
  deleteUser,
};
