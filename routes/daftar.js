const r = require("express").Router();

const daftarController = require("../controllers/daftar");

r.get("/", daftarController.getDaftar);
r.get("/detail", daftarController.getDaftarById);
r.post("/", daftarController.createDaftar);

module.exports = r;
