const bcrypt = require("bcryptjs");
const db = require("../db");

require("dotenv").config();


const validateUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.json({ message: "Nezadal si meno alebo heslo!" });
    } else {
        db.query("SELECT * FROM `users` WHERE email = ?", [email], async (error, results) => {
            if ( results.length == 0 ) {
                return res.json({ message: "Neexistujúci používateľ" });
            } else {
                if (await bcrypt.compare(password, results[0].password)) {
                    
                    user = {id: results[0].id, name:results[0].name, email: results[0].email, role: results[0].role}
                    req.session.user = user;
                    return res.json({ message: "ok"});

                }
                else {
                    let random = Math.floor(Math.random() * 11)
                    if ( random <= 2 ) {
                        return res.json({ message: "Zlé heslo, skús znova!"  });
                    } else if ( random <= 4 ) {
                        return res.json({ message: "Zadávaš zlé heslo!"  });
                    } else if ( random <= 6 ) {
                        return res.json({ message: "Nesprávne heslo!"  });
                    } else if ( random <= 8 ) {
                        return res.json({ message: "Pri zabudnotom hesle kontaktuj admina!"  });
                    } else {
                        return res.json({ message: "Neplatné heslo"  });
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
        res.send({ auth: false});
    }
};

const deleteSession = (req, res) => {
    if ( req.session.user ) {
        req.session.destroy(err => {
            if (err) {
                res.send({logout: false, message: "Problém pri odhlásení"})
            } else {
                res.send({logout: true}) 
            }
        })
    } else {
          res.send({logout: false, message: "Neexistujúca session"})
        }
}
   

module.exports = {
    validateUser,
    sessionExists,
    deleteSession
};