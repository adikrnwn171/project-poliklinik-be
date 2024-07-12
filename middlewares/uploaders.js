const multer = require("multer");

const multerFiltering = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    const error = new Error("Only .png, .jpg, and .jpeg format allowed!");
    error.statusCode = 400;
    cb(error, false);
  }
};

const upload = multer({
  fileFilter: multerFiltering,
});

module.exports = upload;
