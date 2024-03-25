const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRETKEY, {
    expiresIn: "1h",
  });
};

const updateOrCreateToken = (userId) => {
  let token;

  return Token.findOne({
    where: { user_id: userId },
  })
    .then((existingToken) => {
      token = generateToken({ id: userId });

      if (existingToken) {
        return existingToken.update({
          token,
          expirationDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });
      } else {
        return Token.create({
          token,
          expirationDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
          system_user_id: userId,
        });
      }
    })
    .then(() => {
      console.log("Generated Token:", token);
      return token;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { generateToken, updateOrCreateToken };
