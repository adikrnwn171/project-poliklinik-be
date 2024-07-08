require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const r = require("./routes");

app.use(express.json()); // Middleware untuk parsing JSON

// Rute dasar
app.use(r);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
