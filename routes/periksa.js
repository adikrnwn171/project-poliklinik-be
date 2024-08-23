const r = require("express").Router();

const periksaController = require("../controllers/periksa");
const { default: Authorization } = require("../middlewares/authorization");

r.get("/", periksaController.getPeriksa);
r.post("/", Authorization, periksaController.createPeriksa);

module.exports = r;
