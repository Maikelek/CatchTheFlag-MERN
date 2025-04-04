const bcrypt = require("bcryptjs");
const db = require("../db");

require("dotenv").config();


const validateUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.json({ message: "You must insert email and password" });
    } else {
        db.query("SELECT * FROM `users` WHERE email = ?", [email], async (error, results) => {
            if ( results.length == 0 ) {
                return res.json({ message: "User does not exist" });
            } else {
                if (await bcrypt.compare(password, results[0].password)) {
                    
                    user = {id: results[0].id, name:results[0].name, email: results[0].email, role: results[0].role}
                    req.session.user = user;

                    return res.json({ message: "ok", user: user });

                }
                else {
                    let random = Math.floor(Math.random() * 11)
                    if (random <= 2) {
                        return res.json({ message: "Incorrect password, please try again!" });
                    } else if (random <= 4) {
                        return res.json({ message: "You entered the wrong password!" });
                    } else if (random <= 6) {
                        return res.json({ message: "Invalid password!" });
                    } else if (random <= 8) {
                        return res.json({ message: "Wrong password, try again!" });
                    } else {
                        return res.json({ message: "Invalid password" });
                    }
                    
                }
            }
        })
    }
};

const sessionExists = (req, res) => {
    if ( req.session.user) {
        res.send({ auth: true, user: req.session.user});
    } else {
        res.send({ auth: false, user:{role: null}});
    }
};

const deleteSession = (req, res) => {
    if ( req.session.user ) {
        req.session.destroy(err => {
            if (err) {
                res.send({logout: false, message: "Problem with logging out"})
            } else {
                res.send({logout: true}) 
            }
        })
    } else {
          res.send({logout: false, message: "Session does not exist"})
        }
}
   

module.exports = {
    validateUser,
    sessionExists,
    deleteSession
};