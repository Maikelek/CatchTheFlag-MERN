const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");  


router.get("/display", (req, res) => {   
    const q = "SELECT * FROM users"
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error")
        return res.json(data)
    })
  })
  

router.post("/add", async (req, res) => { 
    const q = "INSERT INTO users (`name`, `email`, `password`, `points`) VALUES (?)";

    let password = req.body.password;
    password = await bcrypt.hash(password, 8);

    const values = [
      req.body.name,
      req.body.email,
      password,
      req.body.points
    ];

  
    db.query(q, [values], (error, data) => {
      if (error) return res.send(error);
      return res.json(data);
    });
  });
  

router.delete("/remove/:id", (req, res) => { 
    const userId = req.params.id;
    const q = "DELETE FROM users WHERE id = ?"
  
    db.query(q,[userId], (error, data) => {
        if(error) return res.json("Error")
        return res.json("Level bol zmazaný")
    });
});
  
  
router.put("/update/:id", (req, res) => { 
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
      return res.json("Používateľ bol aktualizovany")
    });
});


module.exports = router;  