const db = require("../db");  


const getUsers = (req, res) => {   
    const q = "SELECT id,name,email,points,role FROM users"
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
  }
  
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
      return res.json("User was updated");
    });
};



module.exports = {
    getUsers,
    updateUser
};