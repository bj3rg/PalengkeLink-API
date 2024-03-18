const express = require('express');
const router = express.Router();

const { createUser, updateUser } = require("../../controllers/User");

router.post("/create", createUser);
router.put("/:userId/update", [], updateUser);


module.exports = router;