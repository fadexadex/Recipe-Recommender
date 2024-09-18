import multer from "multer";
import { dirname, join } from "path";
import { RequestWithFile } from "index";


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (
  req: RequestWithFile,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    req.fileValidationError = "Not an image! Please upload only images.";
    return cb(null, false);
  }
  if (file.size > 10 * 1024 * 1024) {
    req.fileValidationError = "File too large. Maximum size allowed is 10 MB.";
    return cb(null, false);
  }
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fieldSize: 2000000,
  },
});

export default uploadImage;
