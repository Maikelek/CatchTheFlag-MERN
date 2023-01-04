const express = require('express');
const router = express.Router(); 
const levelController = require('../controllers/levelController');


router.route("/")  
    .get(levelController.getLevels)
    .post(levelController.createLevel);

router.route('/:id')
    .get(levelController.getLevelByID)
    .delete(levelController.deleteLevel)
    .put(levelController.updateLevel);

module.exports = router;