const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../GammaVase/public/imgCata"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // extensión
    const name = path.basename(file.originalname, ext); // nombre sin extensión
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, `${name}-${uniqueSuffix}${ext}`); // nombre-169071879-a123.jpg
  },
});

const upload = multer({ storage });

module.exports = upload;

