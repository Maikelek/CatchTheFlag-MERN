const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");  

router.post('/register', (req, res) => {
   
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordRep = req.body.passwordRep;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
        if(error) {
           return console.log(error);
        } 
        if ( results.length > 0 ) {
            return res.status(401).json({ message: "Tento email je už použitý !" });
        } else if ( !name ) {
            return res.status(401).json({ message: "Musíš zadať meno !" });
        } else if ( name.length > 25 ) {
            return res.status(401).json({ message: "Meno nesmie byť dlhšie ako 25 znakov !" });
        } else if ( !email ) {
            return res.status(401).json({ message: "Musíš zadať email !" });
        } else if ( !password || !passwordRep) {
            return res.status(401).json({ message: "Musíš zadať heslo !" });
        } else if ( password !== passwordRep) {
            return res.status(401).json({ message: "Hesla sa nezhodujú !" });
        }


        let hashedPassword = await bcrypt.hash(passwordRep, 8);

        db.query('INSERT INTO users (`id`,`name`, `email`, `password`, `points`) VALUES (0,?,?,?,0)', [name, email, hashedPassword], (error, results) =>{
            if(error) {
                console.log(error);
            } else {
                return res.status(200).json({ messageGreen: "Si zaregistrovaný" });
            }
        });
    });
});


router.post('/login', async (req, res) => {
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
});

module.exports = router;