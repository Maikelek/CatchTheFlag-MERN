const express = require('express');
const router = express.Router(); 
const levelController = require('../controllers/levelController');


router.route("/")  
    .get(levelController.getLevels)

router.route('/:id')
    .get(levelController.getLevelByID)

module.exports = router;