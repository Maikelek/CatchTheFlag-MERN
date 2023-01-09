const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');



router.route('/')
    .post(profilController.getPoints);

module.exports = router;  