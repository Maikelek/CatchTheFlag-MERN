const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.route('/')
    .get(userController.getUsers)

router.route('/:id')
    .put(userController.updateUser)


module.exports = router;  