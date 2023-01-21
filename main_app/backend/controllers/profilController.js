const db = require("../db");
const bcrypt = require("bcryptjs");

const getPoints = (req, res) => { 
  const email = req.body.email;
  const q = "SELECT points FROM users WHERE `email`= ?";


  db.query(q, [email], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

const editUser =  async (req, res)  => { 
  const id = req.body.user.id;
  const email = req.body.user.email;
  const name = req.body.user.name;
  const pass = req.body.user.pass;
  const passRep = req.body.user.passRep;

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if ( !name ) {return res.json({ message: "Musíš mať nejaké meno!" });}
  if ( !email ) {return res.json({ message: "Musíš mať nejaké email!" });}


  if((email && name) && (!pass && !passRep)) {

    if ( name.length > 25 ) {return res.json({ message: "Meno nesmie byť dlhšie ako 25 znakov !" });}
    else if (!emailRegex.test(email)) {return res.json({ message: "Email má nesprávny formát !" })}
    else {
      const q = "UPDATE users SET `name`= ?, `email`= ? WHERE `id`= ? ";
      db.query(q, [name,email,id], (err, data) => {
        if (err) return res.send(err);

        let random = Math.floor(Math.random() * 11)
        if ( random <= 2 ) {
            return res.json({ messageGreen: "Zmeny sa prejavia po opätovnom prihlásení"  });
        } else if ( random <= 4 ) {
            return res.json({ messageGreen: "Po odhlásení sa tvoj profil aktualizuje"  });
        } else if ( random <= 6 ) {
            return res.json({ messageGreen: "Aktualizoval si sa, zmeny uvidíš po odhlásení"  });
        } else if ( random <= 8 ) {
            return res.json({ messageGreen: "Údaje boli zmenené, odhlás sa aby si videl zmeny"  });
        } else {
            return res.json({ messageGreen: "Profil sa aktualizuje po odhlásení"  });
        }
      });
    } 
  }

  if (pass || passRep) {

    if (pass == passRep) {

      if ( pass.length < 7) {return res.json({ message: "Heslo musi mať minimálne 7 znakov" });} 

      let hashedPassword = await bcrypt.hash(passRep, 8);
      const q = "UPDATE users SET `name`= ?, `email`= ?, `password`= ? WHERE `id`= ? ";

      db.query(q, [name,email,hashedPassword,id], (err, data) => {
        if (err) return res.send(err);

        let random = Math.floor(Math.random() * 11)
        if ( random <= 2 ) {
            return res.json({ messageGreen: "Zmeny sa prejavia po opätovnom prihlásení"  });
        } else if ( random <= 4 ) {
            return res.json({ messageGreen: "Po odhlásení sa tvoj profil aktualizuje"  });
        } else if ( random <= 6 ) {
            return res.json({ messageGreen: "Aktualizoval si sa, zmeny uvidíš po odhlásení"  });
        } else if ( random <= 8 ) {
            return res.json({ messageGreen: "Údaje boli zmenené, odhlás sa aby si videl zmeny"  });
        } else {
            return res.json({ messageGreen: "Profil sa aktualizuje po odhlásení"  });
        }
      });
    }

    else if (!pass || !passRep) {
      return res.json({ message: "Musíš zadať a aj zopakovať heslo!"  });
    }

    else{
      return res.json({message: "Hesla sa nezhodujú"});
    }
  }

};

module.exports = {
    getPoints,
    editUser
};
  