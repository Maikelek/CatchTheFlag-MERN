const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isAuthenticated} = require('../middleware/protector');


router.route('/')
    .get(isAuthenticated, userController.getUsers)

router.route('/:id')
    .put(isAuthenticated, userController.updateUser)


module.exports = router;  