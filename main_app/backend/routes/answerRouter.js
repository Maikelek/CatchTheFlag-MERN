const express = require('express');
const router = express.Router(); 
const answerController = require('../controllers/answerController');


router.route("/")  
    .post(answerController.answerChecker) 

router.route("/done")  
    .post(answerController.getLevelsAndDone)


module.exports = router;