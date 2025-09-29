const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");

const multer = require("multer");
const appError = require("../utils/appError");
const { create } = require("../models/users.model");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save uploaded files;
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1];
    const fileName = `user_${Date.now()}.${fileExtension}`;
    cb(null, fileName); // file name to save
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(
      appError.create("Invalid file type. Only images are allowed!", 400),
      false
    );
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter,
});

router.route("/").get(verifyToken, usersController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

router.route("/login").post(usersController.login);

module.exports = router;
