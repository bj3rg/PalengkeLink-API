const Voucher = require("../models/Voucher");
const { Op } = require("sequelize");
// Create voucher
exports.createVoucher = (req, res, next) => {
  const { voucher_code, title, validity_date, percent_off } = req.body;
  const { voucherCode } = req.params;
  Voucher.findOne({
    where: {
      voucher_code: voucherCode,
    },
  })
    .then((data) => {
      if (data) {
        return res.status(400).json({
          success: false,
          message: "Voucher already exist",
        });
      }

      return Voucher.create({
        voucher_code,
        title,
        validity_date,
        percent_off,
      });
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Voucher created",
      });
    })
    .catch((err) => {
      next(err);
    });
};

// Delete voucher
exports.deleteVoucher = (req, res, next) => {
  const { voucherID } = req.params;
  Voucher.findOne({
    where: { id: voucherID },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "No voucher found",
        });
      }

      return data.destroy();
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Voucher deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
};

//update voucher
exports.updateVoucher = (req, res, next) => {
  const { voucherCode } = req.params;
  const { title, validity_date, percent_off, is_available, is_single_use } =
    req.body;

  Voucher.findOne({
    where: {
      voucher_code: voucherCode,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Voucher does not exist",
        });
      }
      data.title = title ? title : data.title;
      data.validity_date = validity_date ? validity_date : data.validity_date;
      data.percent_off = percent_off ? percent_off : data.percent_off;
      data.is_available = is_available ? is_available : data.is_available;
      data.is_single_use = is_single_use ? is_single_use : data.is_single_use;
      return data.save();
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Voucher has been updated",
      });
    })
    .catch((err) => {
      next(err);
    });
};

//Find all voucher
exports.findAllVoucher = (req, res, next) => {
  Voucher.findAll()
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Error",
        });
      }
      if (data.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No vouchers exist",
        });
      }

      const allVouchers = data.map((voucher) => ({
        id: voucher.id,
        voucher_code: voucher.voucher_code,
        title: voucher.title,
        validity_date: voucher.validity_date,
        percent_off: voucher.percent_off,
        is_available: voucher.is_available,
        is_single_use: voucher.is_single_use,
      }));

      return res.status(200).json({
        success: true,
        allVouchers,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//Find voucher by id
exports.findVoucherbyID = (req, res, next) => {
  const { voucherID } = req.params;
  Voucher.findOne({
    where: {
      id: voucherID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "No voucher found",
        });
      }

      const voucher_data = data.map((voucher) => ({
        id: voucher.id,
        voucher_code: voucher.voucher_code,
        title: voucher.title,
        validity_date: voucher.validity_date,
        percent_off: voucher.percent_off,
        is_available: voucher.is_available,
        is_single_use: voucher.is_single_use,
      }));

      return res.status(200).json({
        success: true,
        voucher_data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// Find voucher by voucher code
exports.findVoucherbyVoucher = (req, res, next) => {
  const { voucherCode } = req.params;
  Voucher.findOne({
    where: {
      voucher_code: voucherCode,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Voucher does not exist",
        });
      }
      const voucherDetails = data.map((voucher) => ({
        id: voucher.id,
        title: voucher.title,
        voucher_code: voucherCode,
        validity_date: voucher.validity_date,
        percent_off: voucher.percent_off,
        is_available: voucher.is_available,
        is_single_use: voucher.is_single_use,
      }));
      return res.status(200).json({
        success: true,
        voucherDetails,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//Find all valid voucher
exports.findAllValidVoucher = (req, res, next) => {
  const dateToday = new Date();
  Voucher.findAll({
    where: {
      is_available: true,
      validity_date: {
        [Op.gt]: dateToday,
      },
    },
  })
    .then((data) => {
      if (!data) {
        return errorHandler("No valid vouchers available", 400);
      }
      const vouchers = data.map((voucher) => ({
        id: voucher.id,
        voucher_code: voucher.voucher_code,
        title: voucher.title,
        valid_until: voucher.valid_until,
        percent_off: voucher.percent_off,
        is_available: voucher.is_available,
        is_single_use: voucher.is_single_use,
      }));
      return res.status(200).json({
        success: true,
        vouchers,
      });
    })
    .catch((err) => {
      next(err);
    });
};
