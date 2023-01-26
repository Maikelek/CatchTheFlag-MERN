const bcrypt = require("bcryptjs");
const db = require("../db");  

const getLevelsAdmin = (req, res) => {   
    const q = "SELECT * FROM levels";
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.send(data);
    })
};

const getLevelByIDAdmin = (req, res) => {   
    const levelId = req.params.id;
    const q = "SELECT * FROM levels WHERE id = ?";
      
    db.query(q, [levelId],(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
};

const deleteLevelAdmin = (req, res) => { 
    const levelId = req.params.id;
    const q = "DELETE FROM levels WHERE id = ?";
  
    db.query(q,[levelId], (error, data) => {
        if(error) return res.json("Error");
        return res.json("Level bol zmazaný");
    })
}; 

const updateLevelAdmin = (req, res) => {

    const level = {
        title: req.body.title,
        hint: req.body.hint,
        picture: req.body.picture,
        points: req.body.points,
        pass: req.body.pass,
        link: req.body.link,
        id: req.body.id
    };

    if (!level.title) return res.json({ message: "Level musí mať názov" });
    if (!level.hint) return res.json({ message: "Level musí mať pomôcku" });
    if (level.points <= 0) return res.json({ message: "Počet bodov v musí byť viac ako 0" });
    if (!level.pass) return res.json({ message: "Level musí mať heslo" });

    const q = "UPDATE levels SET `title`= ?, `hint`= ?, `picture`= ?, `points`= ?, `pass`= ?, `link`= ? WHERE `id`= ? ";

    db.query(q, [level.title, level.hint, level.picture, level.points, level.pass, level.link, level.id], (err, data) => {
        if (err) return res.send(err);

        let random = Math.floor(Math.random() * 11)
        if ( random <= 2 ) {
            return res.json({ messageGreen: "Aktualizoval si level"  });
        } else if ( random <= 4 ) {
            return res.json({ messageGreen: "Level bol aktualizovananý"  });
        } else if ( random <= 6 ) {
            return res.json({ messageGreen: "Údaje levelu boli zmenené"  });
        } else if ( random <= 8 ) {
            return res.json({ messageGreen: "Level bol upravený"  });
        } else {
            return res.json({ messageGreen: "Level má nové údaje"  });
        }
      });
};

const createLevelAdmin = (req, res) => {  

    if (!req.body.title) return res.json({ message: "Level musí mať názov" });
    if (!req.body.hint) return res.json({ message: "Level musí mať pomôcku" });
    if (req.body.points <= 0) return res.json({ message: "Počet bodov v musí byť viac ako 0" });
    if (!req.body.pass) return res.json({ message: "Level musí mať heslo" });
    
    const q = "INSERT INTO levels (`title`, `hint`, `picture`, `points`, `pass`, `link`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.hint,
      req.body.picture,
      req.body.points,
      req.body.pass,
      req.body.link
    ];

  
    db.query(q, [values], (error, data) => {
      if (error) return res.send(error);
      return res.json({ messageGreen: "Pridal si level" });
    });
};







/// USERS


const getUsersAdmin = (req, res) => {   
    const q = "SELECT id,name,email,points,role FROM users";
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.send(data);
    })
};

const getUserByIDAdmin = (req, res) => {   
    const userId = req.params.id;
    const q = "SELECT * FROM users WHERE id = ?";
      
    db.query(q, [userId],(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
};

const deleteUserAdmin = (req, res) => { 
    const userId = req.params.id;
    const q = `
                DELETE user_levels, users
                FROM user_levels
                JOIN users ON user_levels.userID = users.id
                WHERE user_levels.userID = 2;
            `;
  
    db.query(q,[userId], (error, data) => {
        if(error) return res.json("Error");
        return res.json("Pouzivatel bol zmazaný");
    });
};

const createUserAdmin = async (req, res) => { 
    const q = "INSERT INTO users (`name`, `email`, `password`, `points`, `role`) VALUES (?)";
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!emailRegex.test(req.body.email)) {return res.json({ message: "Email má nesprávny formát !" })}
    if (!req.body.name) return res.json({ message: "Používateľ musí mať meno" });
    if (!req.body.email) return res.json({ message: "Používateľ musí mať email" });
    if (!req.body.password) return res.json({ message: "Používateľ musí mať heslo" });

    let password = req.body.password;
    password = await bcrypt.hash(password, 8);

    const values = [
      req.body.name,
      req.body.email,
      password,
      req.body.points,
      req.body.role
    ];

  
    db.query(q, [values], (error, data) => {
      if (error) return res.send(error);
      return res.json({messageGreen: "Pridal si používateľa"});
    });
};


module.exports = {
    getLevelsAdmin,
    getLevelByIDAdmin,
    deleteLevelAdmin,
    updateLevelAdmin,
    createLevelAdmin,

    getUsersAdmin,
    getUserByIDAdmin,
    deleteUserAdmin,
    createUserAdmin,
    updateUserAdmin
};