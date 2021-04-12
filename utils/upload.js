import multer from "multer";

const storage = multer.diskStorage({
  destination(req, _file, cb) {
    cb(null, `./public${req.query.path}`);
  },
  filename(_req, file, cb) {
    const type = file.originalname.split(".");
    cb(null, `image-${Date.now()}.${type[type.length - 1]}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({
  storage,
  fileFilter,
});
