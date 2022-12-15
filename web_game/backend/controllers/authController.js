const bcrypt = require("bcryptjs");
const db = require("../db"); 


const validateUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: "Nezadal si meno alebo heslo!" });
    } else {
        db.query("SELECT * FROM `users` WHERE email = ?", [email], async (error, results) => {
            if ( results.length == 0 ) {
                return res.status(400).json({ message: "Neexistujúci používateľ" });
            } else {
                if (await bcrypt.compare(password, results[0].password)) {
                    return res.status(200).json({ message: "200" });
                }
                else {
                    let random = Math.floor(Math.random() * 11)
                    if ( random <= 2 ) {
                        return res.status(400).json({ message: "Zlé heslo, skús znova!"  });
                    } else if ( random <= 4 ) {
                        return res.status(400).json({ message: "Zadávaš zlé heslo!"  });
                    } else if ( random <= 6 ) {
                        return res.status(400).json({ message: "Nesprávne heslo!"  });
                    } else if ( random <= 8 ) {
                        return res.status(400).json({ message: "Pri zabudnotom hesle kontaktuj admina!"  });
                    } else {
                        return res.status(400).json({ message: "Neplatné heslo"  });
                    }
                    
                }
            }
        })
    }
};
   

module.exports = {
    validateUser
};