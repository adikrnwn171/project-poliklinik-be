const r = require("express").Router();

const periksaController = require("../controllers/periksa");

r.get("/", periksaController.getPeriksa);
r.post("/", periksaController.createPeriksa);

module.exports = r;
