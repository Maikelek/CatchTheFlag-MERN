const express = require('express');
const router = express.Router(); 
const answerController = require('../controllers/answerController');


router.route("/")  
    .post(answerController.answerChecker)


module.exports = router;