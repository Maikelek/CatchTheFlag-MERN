const bcrypt = require("bcryptjs");
const db = require("../db"); 


const userRegister = (req, res) => {
   
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
        } else if ( password.length < 7) {
            return res.status(401).json({ message: "Heslo musi mať minimálne 7 znakov" });
        }else if ( password !== passwordRep) {
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
};

module.exports = {
    userRegister
};