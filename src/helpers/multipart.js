import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/");
  },
  filename: (req, file, cb) => {
    const unix = Date.now();
    cb(null, unix + "-" + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  }
};

const maxSize = 5 * 1024 * 1024;

const upload = multer({ storage: storage, fileFilter: filter, limits: maxSize }).single("photo");

export default upload;
