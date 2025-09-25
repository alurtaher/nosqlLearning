const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

router.post("/register", user.registerUser);

router.post("/find-user", user.findUserById);

module.exports = router;