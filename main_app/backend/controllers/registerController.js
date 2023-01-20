const bcrypt = require("bcryptjs");
const db = require("../db"); 


const userRegister = (req, res) => {
   
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordRep = req.body.passwordRep;

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if ( !name ) {return res.status(401).json({ message: "Musíš zadať meno !" });}

    if ( name.length > 25 ) {return res.status(401).json({ message: "Meno nesmie byť dlhšie ako 25 znakov !" });}

    if( !email ) {return res.status(401).json({ message: "Musíš zadať email!" });}

    if(!emailRegex.test(email)) {return res.status(401).json({ message: "Email má nesprávny formát !" });}
    
    if ( !password || !passwordRep) {return res.status(401).json({ message: "Musíš zadať heslo !" });} 
    
    if ( password.length < 7) {return res.status(401).json({ message: "Heslo musi mať minimálne 7 znakov" });} 
    
    if ( password !== passwordRep) {return res.status(401).json({ message: "Hesla sa nezhodujú !" });}

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
        if(error) {
           return console.log(error);
        } 
        if ( results.length > 0 ) {
            return res.status(401).json({ message: "Tento email je už použitý !" });
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