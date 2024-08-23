const jwt = require("jsonwebtoken");
const { Dokters } = require("../models");

const Authorization = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: "failed",
        message: "Token not found",
      });
    }

    const bearerToken = req.headers.authorization;

    const token = bearerToken.split("Bearer ")[1];

    const payload = jwt.verify(token, "rahasia");
    if (payload.role !== "dokter") {
      return res.status(403).json({
        status: "forbidden",
        message: "access denied",
      });
    }

    const user = await Dokters.findByPk(payload.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export default Authorization;
