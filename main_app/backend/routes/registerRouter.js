const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const {isAuthenticated} = require('../middleware/protector');


router.route("/")  
    .post(registerController.userRegister);

module.exports = router;