const r = require("express").Router();

const pasien = require("./pasien");
const dokter = require("./dokter");
const jadwal = require("./jadwal");
const daftar = require("./daftar");
const periksa = require("./periksa");
const obat = require("./obat");

r.use("/api/pasien", pasien);
r.use("/api/dokter", dokter);
r.use("/api/jadwal", jadwal);
r.use("/api/daftar", daftar);
r.use("/api/periksa", periksa);
r.use("/api/obat", obat);

module.exports = r;
