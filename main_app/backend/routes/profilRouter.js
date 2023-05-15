const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');
const {isAuthenticated} = require('../middleware/protector');


router.route('/')
    .post(isAuthenticated, profilController.getPoints)
    .put(isAuthenticated, profilController.editUser);

module.exports = router;  