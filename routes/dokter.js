const r = require("express").Router();

const dokterController = require("../controllers/dokter");

r.get("/", dokterController.getAllDokter);
r.post("/register", dokterController.register);
r.post("/login", dokterController.login);
r.get("/detail", dokterController.showDokter);
r.put("/update", dokterController.updateDokter);
r.delete("/:id", dokterController.deleteDokter);

module.exports = r;
