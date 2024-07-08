const r = require("express").Router();

const jadwalController = require("../controllers/jadwal");

r.get("/", jadwalController.getAllJadwal);
r.post("/", jadwalController.createJadwal);
r.get("/detail", jadwalController.showJadwal);
r.put("/update/:id", jadwalController.updateJadwal);

module.exports = r;
