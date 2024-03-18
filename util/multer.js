const multer = require("multer");

const uploadFolders = {
  // add folder names here
  //format: profileImage: "public/assets/profile-upload",
  productImage: "public/assets/product-image",
  dealsImages: "public/deals-upload",
  merchantImage: "public/merchants-upload",
  governmentId_image: "public/government_id-upload",
  selfie_governmentId_image: "public/selfie_government_id-upload",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = uploadFolders[file.fieldname];

    if (uploadFolder) {
      cb(null, uploadFolder);
    } else {
      cb(new Error("Invalid fieldname"), false);
    }
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const formattedDate = date.toISOString().replace(/:/g, "-") + "-";
    cb(null, formattedDate + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // DOCX
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported"), false);
  }
};

const multerConfig = (req, res, next) => {
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }).fields([
    {
    //   sample format:
    //   name: "profileImage",
    //   maxCount: 1,
        name: "productImage",
        maxCount: 4,
    },
    {
      name: "dealsImages",
      maxCount: 5,
    },
    {
      name: "merchantImage",
      maxCount: 1,
    },
    {
      name: "governmentId_image",
      maxCount: 1,
    },
    {
      name: "selfie_governmentId_image",
      maxCount: 1,
    },
  ])(req, res, next);
};

module.exports = multerConfig;
