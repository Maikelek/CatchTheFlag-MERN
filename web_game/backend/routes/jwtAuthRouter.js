const express = require('express');
const router = express.Router(); 
const verifyJWT = require("../middleware/verifyJWT")


router.get('/', verifyJWT, (req, res) => {
    console.log("verified")
});


module.exports = router;