const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController');


router.route("/level")  
    .get(adminController.getLevelsAdmin)
    .post(adminController.createLevelAdmin);

router.route('/level/:id')
    .get(adminController.getLevelByIDAdmin)
    .delete(adminController.deleteLevelAdmin)
    .put(adminController.updateLevelAdmin);


router.route("/user")  
    .get(adminController.getUsersAdmin)
    .post(adminController.createUserAdmin);

router.route('/user/:id')
    .delete(adminController.deleteUserAdmin)
    .get(adminController.getUserByIDAdmin)
    .put(adminController.updateUserAdmin);


module.exports = router;