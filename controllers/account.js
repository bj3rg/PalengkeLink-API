const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const errorHandler = require("../util/errorHandler");
const VerificationCodes = require("../models/VerificationCodes");
const generateRandomCode = require("../helpers/randomCodeGenerator");
const { updateOrCreateToken } = require("../helpers/tokenHelper");

const Users = require("../models/User");

const {
  transporter,
  createVerificationEmail,
} = require("../helpers/emailHelper");

//sign up
exports.signUp = (req, res, next) => {
  const {
    first_name,
    last_name,
    email_address,
    birth_date,
    password,
    confirm_password,
    phone_number,
  } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

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

//send otp
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

//verify email
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

      data.is_available = false;
      return data.save().then(() => {
        return res.status(200).json({
          success: true,
          message: "Correct Verification Code.",
        });
      });
    })
    .catch((saveError) => {
      console.error("Error saving user:", saveError);
      next(saveError);
    });
};

//log in
exports.logIn = (req, res, next) => {
  const { phoneNum, password } = req.body;
  let userInfo;

  Users.findOne({
    where: {
      phone_number: phoneNum,
    },
  })
    .then((user) => {
      if (!user) {
        errorHandler("User not found", 404);
      }
      userInfo = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        errorHandler("Wrong password", 401);
      }

      return updateOrCreateToken(userInfo.id);
    })
    .then((token) => {
      console.log("token: ", token);
      res.status(200).json({
        token: token,
        userId: userInfo.id,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        emailAddress: userInfo.email_address,
        mobileNumber: userInfo.phone_number,
        success: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//forgot password
exports.forgotPassword = (req, res, next) => {
  const { email_address, new_password, confirm_password } = req.body;

  if (new_password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

  Users.findOne({
    where: {
      email_address: email_address,
    },
  })
    .then((userData) => {
      if (!userData) {
        errorHandler("User not found", 404);
      }

      bcrypt.hash(new_password, 10).then((hashedPassword) => {
        return userData.update({ password: hashedPassword });
      });
    })
    .then(() => {
      res.status(200).json({
        message: "User password changed successfully.",
        success: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
