const express = require('express');
const router = express.Router(); 
const answerController = require('../controllers/answerController');
const {isAuthenticated} = require('../middleware/protector');


router.route("/")  
    .post(isAuthenticated, answerController.answerChecker) 

router.route("/done")  
    .post(isAuthenticated, answerController.getLevelsAndDone)


module.exports = router;