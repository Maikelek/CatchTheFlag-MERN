const bcrypt = require("bcryptjs");
const db = require("../db");  


const getUsers = (req, res) => {   
    const q = "SELECT * FROM users"
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
  }
  

const createUser = async (req, res) => { 
    const q = "INSERT INTO users (`name`, `email`, `password`, `points`, `role`) VALUES (?)";

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
      return res.json(data);
    });
  };
  

const deleteUser = (req, res) => { 
    const userId = req.params.id;
    const q = "DELETE FROM users WHERE id = ?";
  
    db.query(q,[userId], (error, data) => {
        if(error) return res.json("Error");
        return res.json("Level bol zmazaný");
    });
};
  
  
const updateUser = (req, res) => { 
    const userId = req.params.id;
    const q = "UPDATE users SET `name`= ?, `email`= ?, `password`= ?, `points`= ? WHERE id = ?";
  
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.points
    ];
  
    db.query(q, [...values,userId], (err, data) => {
      if (err) return res.send(err);
      return res.json("Používateľ bol aktualizovany");
    });
};

const getPoints = (req, res) => { 
  const email = req.body.email;
  const q = "SELECT points FROM users WHERE `email`= ?";


  db.query(q, [email], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getPoints
};