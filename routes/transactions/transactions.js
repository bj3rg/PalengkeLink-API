const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator");

const {
    createTransaction,
    deleteTransaction
} = require("../../controllers/transaction");

const Users = require("../../models/User");
const Orders = require("../../models/Orders");
const Voucher = require("../voucher/voucher");

router.post(
    "/create",
    [
    body("user_id").notEmpty().isUUID()
        .custom((value, { req }) => {
        return Users.findOne({
            where: {
            id: value,
            },
        }).then((user) => {
            if (!user) {
            return Promise.reject("User does not exists!");
            }
        });
    }),
    body("order_id").notEmpty().isUUID()
        .custom((value, { req }) => {
        return Orders.findOne({
            where: {
            id: value,
            },
        }).then((order) => {
            if (!order) {
            return Promise.reject("Order does not exists!");
            }
        });
    }),
    body("voucher_id").optional(),
    //     .custom((value, { req }) => {
    //     return Voucher.findOne({
    //         where: {
    //         id: value,
    //         },
    //     }).then((order) => {
    //         if (!order) {
    //         return Promise.reject("Order does not exists!");
    //         }
    //     });
    // }),
    body("payment_method").notEmpty(),
    body("delivery_courier").notEmpty(),
    body("date").notEmpty(),
    body("time_start").notEmpty(),
    body("time_end").notEmpty(),
    body("place_id").notEmpty(),
    body("transaction_status").notEmpty(),
    body("status").notEmpty(),
    ],
    validation,
    createTransaction
);

module.exports = router;
