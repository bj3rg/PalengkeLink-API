const Users = require("../models/User");

exports.createUser = (req, res, next) => {
  const {
    first_name,
    last_name,
    middle_name,
    address,
    phone_number,
    email_address,
    gender,
    birth_date,
    fcm_token,
    password,
    status,
  } = req.body;
  Users.findOne({
    where: {
      email_address: email_address,
    },
  })
    .then((data) => {
      if (data) {
        return res
          .status(400)
          .json({ success: false, message: "Email Address Already Taken" });
      } else {
        return Users.create({
          first_name,
          last_name,
          middle_name,
          address,
          phone_number,
          email_address,
          gender,
          birth_date,
          fcm_token,
          password,
          status,
        }).then(() => {
          return res
            .status(200)
            .json({ success: true, message: "User Created SUccessfully" });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

//update user
exports.updateUser = (req, res, next) => {
  const { userId } = req.params;
  const {
    first_name,
    last_name,
    middle_name,
    address,
    phone_number,
    email_address,
  } = req.body;
};
//update user status
//delete user
//get user by id
//get all users status true
//get
