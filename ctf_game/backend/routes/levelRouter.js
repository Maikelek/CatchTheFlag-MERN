const express = require('express');
const router = express.Router(); 
const levelController = require('../controllers/levelController');
const {isAuthenticated} = require('../middleware/protector');


router.route("/")  
    .get(isAuthenticated, levelController.getLevels)

router.route('/:id')
    .get(isAuthenticated, levelController.getLevelByID)

module.exports = router;