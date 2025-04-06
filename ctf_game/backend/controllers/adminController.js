const bcrypt = require("bcryptjs");
const db = require("../db");  
const emailSender = require("../mailer"); 

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
        return res.json("Level was deleted");
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

    if (!level.title) return res.json({ message: "Level must have title" });
    if (level.hint.length <= 0) return res.json({ message: "Level must have hint" });
    if (level.points <= 0) return res.json({ message: "Point count must be above 0" });
    if (!level.pass) return res.json({ message: "Level must have password" });

    const q = "UPDATE levels SET `title`= ?, `hint`= ?, `picture`= ?, `points`= ?, `pass`= ?, `link`= ? WHERE `id`= ? ";

    db.query(q, [level.title, level.hint, level.picture, level.points, level.pass, level.link, level.id], (err, data) => {
        if (err) return res.send(err);

        let random = Math.floor(Math.random() * 11)
        if ( random <= 2 ) {
            return res.json({ messageGreen: "Level was updated"  });
        } else if ( random <= 4 ) {
            return res.json({ messageGreen: "You have updated the level"  });
        } else if ( random <= 6 ) {
            return res.json({ messageGreen: "Level data were changed"  });
        } else if ( random <= 8 ) {
            return res.json({ messageGreen: "Successfully updated"  });
        } else {
            return res.json({ messageGreen: "Level is now up to date"  });
        }
      });
};

const createLevelAdmin = (req, res) => {  

    if (!req.body.title) return res.json({ message: "Level must have a title" });
    if (req.body.hint.length <= 0)  return res.json({ message: "Level must have a hint" });
    if (req.body.points <= 0) return res.json({ message: "Points must be above 0" });
    if (!req.body.pass) return res.json({ message: "Level must have a password" });
    
    const qCheck = "SELECT * FROM levels WHERE title = ?";
    const q = "INSERT INTO levels (`title`, `hint`, `picture`, `points`, `pass`, `link`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.hint,
      req.body.picture,
      req.body.points,
      req.body.pass,
      req.body.link
    ];

    db.query(qCheck, req.body.title, (error, data) => {
        if (error) return res.send(error);

        if (data.length === 0) {
            db.query(q, [values], (error, data) => {
                if (error) return res.send(error);
                return res.json({ messageGreen: "Level was added" });
            });
        }else{
            return res.json({ message: "Level already exists" });
        }
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
    LEFT JOIN users ON user_levels.userID = users.id
    WHERE user_levels.userID = ?;
`;

    db.query("SELECT email FROM `users` WHERE id = ?", [userId], (error, response) => {
        const email = response[0].email;
        emailSender(email, 'Removed Account', `Your accout was removed by the admin and you cannot play no more. \n\nAdmin and Developer HackTheMaturita`);
    });

    db.query("SELECT * FROM user_levels WHERE `userID` = ?",[userId], (error, response) => {
        if(error) return res.json("Error");

        if (response.length == 0) {
            db.query("DELETE FROM users WHERE id = ?",[userId], (error, data) => {
                if(error) return res.json("Error");
                return res.json("User was removed");
            });
        }
        else {
            db.query(q,[userId], (error, data) => {
                if(error) return res.json("Error");
                return res.json("User was removed");
            });
        }
    });

};

const createUserAdmin = async (req, res) => { 
    const q = "INSERT INTO users (`name`, `email`, `password`, `points`, `role`) VALUES (?)";
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!req.body.name) return res.json({ message: "User must have a nick" });
    if (req.body.name.length > 25) return res.json({ message: "Nick must not exceed 25 characters" });
    if (!emailRegex.test(req.body.email)) {return res.json({ message:  "Email has an invalid format!" })}
    if (!req.body.email) return res.json({ message:  "User must have an email" });
    if (!req.body.password) return res.json({ message: "User must have a password" });

    let password = req.body.password;
    let email = req.body.email;
    password = await bcrypt.hash(password, 8);

    const values = [
      req.body.name,
      email,
      password,
      req.body.points,
      req.body.role
    ];

    db.query("SELECT email FROM `users` WHERE email = ?", [email], async (error, results) => {
        if ( results.length >= 1 ) {
            return res.json({ message: "This email is used" });
        }

        else {
            emailSender(email, 'Admin creation', `Your account was created by admin!\nIf this information is completely new and you do not agree with the account, contact me at this email. \n\nAdmin and Developer Webu HackTheMaturita`);
            db.query(q, [values], (error, data) => {
                if (error) return res.send(error);
                return res.json({messageGreen: "User was added!"});
              });
        }
    });
};

const updateUserAdmin = (req, res) => {

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        points: req.body.points,
        role: req.body.role
    };

    if (!user.name) return res.json({ message: "User must have a name" });
    if (req.body.name.length > 25) return res.json({ message: "Name cannot be more than 25 characters" });
    if (!emailRegex.test(req.body.email)) {return res.json({ message: "Email has an invalid format !" })}
    if (user.points < 0) return res.json({ message: "User cannot have negative points" });    


    db.query("SELECT `password` FROM users WHERE id = ?", [user.id], async (error, data) => {
        if (error) return res.send(error);
        const passDB = data[0].password

        if (user.password === passDB) {
            const q = "UPDATE users SET `name`= ?, `email`= ?, `points`= ?, `role`= ? WHERE `id`= ? ";
            db.query(q, [user.name, user.email, user.points, user.role, user.id], (error, data) => {
                if (error) return res.send(error);
                emailSender(user.email, 'Updated by Admin', `Your account has been updated by an admin! If these changes affect your gameplay, please contact me at this email.\n\nAdmin and Developer HackTheMaturita`);
                let random = Math.floor(Math.random() * 11)

                if ( random <= 2 ) {
                    return res.json({ messageGreen: "You have updated the user" });
                } else if ( random <= 4 ) {
                    return res.json({ messageGreen: "User has been updated" });
                } else if ( random <= 6 ) {
                    return res.json({ messageGreen: "User data has been changed" });
                } else if ( random <= 8 ) {
                    return res.json({ messageGreen: "User has been modified" });
                } else {
                    return res.json({ messageGreen: "User has new data" });
                }
            });  
        }

        else {
            const q = "UPDATE users SET `name`= ?, `email`= ?, `password`= ?, `points`= ?, `role`= ?  WHERE `id`= ? ";
            const newPassword = await bcrypt.hash(user.password, 8);
            db.query(q, [user.name, user.email, newPassword, user.points, user.role, user.id], (error, data) => {
                if (error) return res.send(error);

                let random = Math.floor(Math.random() * 11)
                if ( random <= 2 ) {
                    return res.json({ messageGreen: "You have updated the user" });
                } else if ( random <= 4 ) {
                    return res.json({ messageGreen: "User has been updated" });
                } else if ( random <= 6 ) {
                    return res.json({ messageGreen: "User data has been changed" });
                } else if ( random <= 8 ) {
                    return res.json({ messageGreen: "User has been modified" });
                } else {
                    return res.json({ messageGreen: "User has new data" });
                }

            });  
        }
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
