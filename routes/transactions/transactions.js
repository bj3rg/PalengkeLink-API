const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator");

const {
    createTransaction,
    deleteTransaction
} = require("../../controllers/transaction");

router.post(
    "/create",
    [
    ],
    validation,
    createTransaction
);

module.exports = router;
