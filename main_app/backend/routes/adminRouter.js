const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController');
const {isAdmin} = require('../middleware/protector');


router.route("/level")  
    .get(isAdmin, adminController.getLevelsAdmin)
    .post(isAdmin, adminController.createLevelAdmin);

router.route('/level/:id')
    .get(isAdmin, adminController.getLevelByIDAdmin)
    .delete(isAdmin, adminController.deleteLevelAdmin)
    .put(isAdmin, adminController.updateLevelAdmin);


router.route("/user")  
    .get(isAdmin, adminController.getUsersAdmin)
    .post(isAdmin, adminController.createUserAdmin);

router.route('/user/:id')
    .delete(isAdmin, adminController.deleteUserAdmin)
    .get(isAdmin, adminController.getUserByIDAdmin)
    .put(isAdmin, adminController.updateUserAdmin);


module.exports = router;