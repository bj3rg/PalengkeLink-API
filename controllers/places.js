const Places = require("../models/Places");
const Users = require("../models/User");

exports.addPlace = (req, res, next) => {
  const {
    user_id,
    first_name,
    last_name,
    middle_name,
    address,
    phone_number,
    details,
  } = req.body;
  Places.findOne({
    where: {
      user_id: user_id,
      address: address,
    },
  })
    .then((place) => {
      if (place) {
        return res
          .status(400)
          .json({ success: false, message: "Address already exist" });
      }
      return Places.create({
        user_id,
        first_name,
        last_name,
        middle_name,
        address,
        phone_number,
        details,
      }).then(() => {
        return res.status(200).json({ success: true, message: "Place added" });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updatePlace = (req, res, next) => {
  const { placeId } = req.params;
  const { first_name, last_name, middle_name, address, phone_number, details } =
    req.body;
  Places.findOne({
    where: {
      id: placeId,
    },
  })
    .then((place) => {
      if (!place) {
        return res
          .status(400)
          .json({ success: false, message: "Place id does not exist" });
      }
      place.first_name = first_name ? first_name : place.first_name;
      place.last_name = last_name ? last_name : place.last_name;
      place.middle_name = middle_name ? middle_name : place.middle_name;
      place.address = address ? address : place.address;
      place.phone_number = phone_number ? phone_number : place.phone_number;
      place.details = details ? details : place.details;
      return place.save().then(() => {
        return res
          .status(200)
          .json({ success: true, message: "Place updated" });
      });
    })
    .catch((err) => {
      next(err);
    });
};

//delete place by id
exports.deletePlaceById = (req, res, next) => {
  const { placeId } = req.params;
  Places.findOne({
    where: {
      id: placeId,
    },
  })
    .then((place) => {
      if (!place) {
        return res
          .status(400)
          .json({ success: false, message: "Place id does not exist" });
      }
      return place.destroy.then(() => {
        return res
          .status(200)
          .json({ success: true, message: "Place deleted" });
      });
    })
    .catch((err) => {
      next(err);
    });
};

//get all places by userid
exports.findAllPlacesByUserId = (req, res, next) => {
  const { userId } = req.params;
  Users.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User id not found" });
      }
      return Places.findAll({
        where: {
          user_id: userId,
        },
      }).then((places) => {
        if (!places.length > 0) {
          return res
            .status(400)
            .json({ success: false, message: "Place id does not exist" });
        }
        return res.status(200).json({ success: true, places });
      });
    })
    .catch((err) => {
      next(err);
    });
};

//get place by id
exports.findPlaceById = (req, res, next) => {
  const { placeId } = req.params;
  Places.findOne({
    where: {
      id: placeId,
    },
  })
    .then((place) => {
      if (!place) {
        return res
          .status(400)
          .json({ success: false, message: "Place id does not exist" });
      }

      return res.status(200).json({ success: true, place });
    })
    .catch((err) => {
      next(err);
    });
};
