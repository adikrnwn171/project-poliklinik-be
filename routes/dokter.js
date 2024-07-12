const r = require("express").Router();

const dokterController = require("../controllers/dokter");

const Uploader = require("../middlewares/uploaders");

r.get("/", dokterController.getAllDokter);
r.post("/register", dokterController.register);
r.post("/login", dokterController.login);
r.get("/detail", dokterController.showDokter);
r.put("/update", Uploader.single("image"), dokterController.updateDokter);
r.delete("/:id", dokterController.deleteDokter);

module.exports = r;
