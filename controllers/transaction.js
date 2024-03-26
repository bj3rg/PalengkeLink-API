const errorHandler = require("../util/errorHandler");
const Orders = require("../models/Orders");
const generateReferenceNumber = require("../helpers/generateUUID");
const Transactions = require("../models/Transactions");

exports.createTransaction = (req, res, next) => {
    const { 
        user_id,
        order_id,
        voucher_id,
        payment_method,
        delivery_courier,
        date,
        time_start,
        time_end,
        place_id,
        transaction_status,
        status
    } = req.body;

    const reference_no = generateReferenceNumber();
    console.log("reference_no: ", reference_no)
    Transactions.create({
        user_id,
        order_id,
        voucher_id,
        payment_method,
        delivery_courier,
        date,
        time_start,
        time_end,
        place_id,
        transaction_status,
        reference_no,
        status
    })
    .then((transaction) => {
        res.status(201).json({ success: true, transaction });
    })
    .catch((err) => {
        next(err);
    });
};
