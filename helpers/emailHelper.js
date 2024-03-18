const transporter = require("../helpers/transporter");
const emailTemplates = require("../helpers/emailTemplate");
const generateRandomCode = require("../helpers/randomCodeGenerator");

const createVerificationEmail = (clientEmail) => {
  const verificationCode = generateRandomCode();
  const htmlMessage =
    emailTemplates.createVerificationEmailTemplate(verificationCode);

  return {
    from: process.env.EMAIL_USER,
    to: clientEmail,
    subject: "Verification Code",
    html: htmlMessage,
    verificationCode,
  };
};

module.exports = { transporter, createVerificationEmail };
