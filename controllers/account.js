const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const errorHandler = require("../util/errorHandler");

const Users = require("../models/User");

const {
  transporter,
  createVerificationEmail,
} = require("../helpers/emailHelper");

exports.signUp = (req, res, next) => {
  const { email_address, password } = req.body;

  Users.findOne({ where: { email_address: email_address } }).then((data) => {
    if (data) {
      return res.status(400).json({
        success: false,
        message: "Email already exist!",
      });
    }

    const mailOptions = createVerificationEmail(email_address);

    return Promise.all([
      transporter.sendMail(mailOptions),
      VerificationCodes.create({
        verification_code: mailOptions.verificationCode,
        ip_address: "Sample IP",
      }),
    ]);
  });
};
