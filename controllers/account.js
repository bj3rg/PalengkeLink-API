const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const errorHandler = require("../util/errorHandler");
const VerificationCodes = require("../models/VerificationCodes");
const generateRandomCode = require("../helpers/randomCodeGenerator");

const Users = require("../models/User");

const {
  transporter,
  createVerificationEmail,
} = require("../helpers/emailHelper");

exports.signUp = (req, res, next) => {
  const {
    first_name,
    last_name,
    email_address,
    birth_date,
    password,
    phone_number,
  } = req.body;

  Users.findOne({ where: { email_address: email_address } })
    .then((data) => {
      if (data) {
        return res.status(400).json({
          success: false,
          message: "Email already exist!",
        });
      }
      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.error("Error generating salt:", err);
          return next(err);
        }

        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) {
            console.error("Error hashing password:", err);
            return next(err);
          }

          Users.create({
            first_name,
            last_name,
            email_address,
            birth_date,
            password: hashedPassword,
            phone_number,
          });
        });
      });
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Signed Up succesfully",
      });
    })
    .catch((err) => {
      errorHandler(err, 500);
    });
};

exports.sendEmailOTP = (req, res, next) => {
  const { email_address } = req.body;

  const verificationCode = generateRandomCode();
  let promise;

  promise = VerificationCodes.create({
    verification_code: verificationCode,
    email_address: email_address,
    ip_address: req.ip,
  });

  const mailOptions = createVerificationEmail(email_address, verificationCode);
  return Promise.all([promise, transporter.sendMail(mailOptions)])

    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Verification code sent successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.verifyEmail = (req, res, next) => {
  const { email_address, verification_code } = req.body;

  VerificationCodes.findOne({
    where: {
      verification_code: verification_code,
      email_address: email_address,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Invalid Verification code",
        });
      }

      if (!data.is_available) {
        return res.status(400).json({
          success: false,
          message: "Verification Code Expires",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Correct Verification Code.",
      });
    })
    .catch((saveError) => {
      console.error("Error saving user:", saveError);
      next(saveError);
    });
};

exports.logIn = (req, res, next) => {
  const { phoneNum, password } = req.body;
  let userInfo;

  Users.findOne({
    where: {
      phone_number: email_address,
    },
  }).then((user) => {
    if (!user) {
      errorHandler("User not found", 404);
    }
    userInfo = user;

    return bcrypt.compare(password, client.password);
  });
};
