const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token)

    if (!token) {
        res.json({ auth: false});
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false});
            } else {
                req.userEmail = decoded.email;
                res.json({ auth: true, userEmail:req.userEmail})
                next();
            }
        })
    }
}

module.exports = verifyJWT;