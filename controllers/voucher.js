const Voucher = require("../models/Voucher");

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

//findAllValidVoucher
// exports.updateVoucher = (req, res, next) => {
//     const { voucherID } = req.params;
//   };
