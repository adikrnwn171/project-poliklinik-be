const r = require("express").Router();

const pasienController = require("../controllers/pasien");

r.get("/", pasienController.getAllPasien);
r.post("/register", pasienController.register);
r.post("/verify", pasienController.verifyOTP);
r.post("/login", pasienController.login);
r.get("/detail", pasienController.getUserByToken);
r.put("/update", pasienController.update);
r.post("/link-reset-password", pasienController.linkResetPassword);
r.put("/reset-password", pasienController.resetPassword);
r.delete("/", pasienController.deleteUser);

module.exports = r;
