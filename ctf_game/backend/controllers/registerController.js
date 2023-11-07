const bcrypt = require("bcryptjs");
const db = require("../db"); 
const emailSender = require("../mailer"); 


const userRegister = (req, res) => {
   
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordRep = req.body.passwordRep;

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if ( !name ) {return res.status(401).json({ message: "Insert nick !" });}

    if ( name.length > 25 ) {return res.status(401).json({ message: "Nick cannot be longer than 25 characters !" });}

    if( !email ) {return res.status(401).json({ message: "Insert email !" });}

    if(!emailRegex.test(email)) {return res.status(401).json({ message: "Wrong email format !" });}
    
    if ( !password || !passwordRep) {return res.status(401).json({ message: "Insert password !" });} 
    
    if ( password.length < 7) {return res.status(401).json({ message: "Password must have 7+ chars" });} 
    
    if ( password !== passwordRep) {return res.status(401).json({ message: "Passwords are not matching !" });}

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
        if(error) {
           return console.log(error);
        } 
        if ( results.length > 0 ) {
            return res.status(401).json({ message: "Email is already used !" });
        }


        let hashedPassword = await bcrypt.hash(passwordRep, 8);

        db.query('INSERT INTO users (`id`,`name`, `email`, `password`, `points`) VALUES (0,?,?,?,0)', [name, email, hashedPassword], (error, results) =>{
            if(error) {
                console.log(error);
            } else {
                emailSender(email, 'Welcome in HackTheMaturita CTF', `Your account was registered ${name}.\nI hope you will gain new experiences and have fun! \n\nAdmin and Developer of HackTheMaturita website`);
                return res.status(200).json({ messageGreen: "You are registered." });
            }
        });
    });
};

module.exports = {
    userRegister
};
