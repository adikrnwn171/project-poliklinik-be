const r = require("express").Router();

const obatController = require("../controllers/obat");

r.get("/", obatController.getObat);
r.post("/", obatController.createObat);

module.exports = r;
