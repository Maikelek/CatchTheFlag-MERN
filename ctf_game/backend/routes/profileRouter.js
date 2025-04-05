const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const {isAuthenticated} = require('../middleware/protector');


router.route('/')
    .post(isAuthenticated, profileController.getPoints)
    .put(isAuthenticated, profileController.editUser);

module.exports = router;