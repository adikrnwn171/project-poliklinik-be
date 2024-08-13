const r = require("express").Router();

const pasienController = require("../controllers/pasien");
const Uploader = require("../middlewares/uploaders");

r.get("/", pasienController.getAllPasien);
r.post("/register", Uploader.single("image"), pasienController.register);
r.post("/verify", pasienController.verifyOTP);
r.post("/login", pasienController.login);
r.get("/detail", pasienController.getUserByToken);
r.put("/update", Uploader.single("image"), pasienController.update);
r.post("/link-reset-password", pasienController.linkResetPassword);
r.put("/reset-password", pasienController.resetPassword);
r.delete("/", pasienController.deleteUser);

module.exports = r;
