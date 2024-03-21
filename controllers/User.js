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
  Users.findOne({
    where: {
      id: userId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .json({ success: false, message: "User id does not exist" });
      } else {
        data.first_name = first_name;
        data.last_name = last_name;
        data.middle_name = middle_name;
        data.address = address;
        data.phone_number = phone_number;
        data.email_address = email_address;
        return data.save().then(() => {
          return res
            .status(200)
            .json({ success: true, message: "User info updated" });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

//update user status
exports.updateStatus = (req, res, next) => {
  const { userId, stat } = req.params;
  Users.findOne({
    where: {
      id: userId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .json({ success: false, message: "User id does not exist" });
      } else if (data.status === stat) {
        return res
          .status(400)
          .json({ success: false, message: "Status already set to " + stat });
      } else {
        data.status = stat;
        return data.save().then(() => {
          return res
            .status(200)
            .json({ success: true, message: "User info updated" });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  Users.findOne({
    where: {
      id: userId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .json({ success: false, message: "User id does not exist" });
      } else {
        return data.destroy().then(() => {
          return res
            .status(200)
            .json({ success: true, message: "User deleted permanently" });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

//get user by id
exports.findUserById = (req, res, next) => {
  const { userId } = req.params;
  Users.findOne({
    where: {
      id: userId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .json({ success: false, message: "User id does not exist" });
      } else {
        return res.status(200).json({ success: true, data });
      }
    })
    .catch((err) => {
      next(err);
    });
};

//get all users status true
exports.findAllActiveUsers = (req, res, next) => {
  Users.findAll({
    where: {
      status: true,
    },
  })
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      next(err);
    });
};
