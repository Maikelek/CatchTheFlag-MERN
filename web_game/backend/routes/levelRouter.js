const express = require('express');
const router = express.Router();
const db = require("../db");  


router.get("/display", (req, res) => {   
    const q = "SELECT * FROM levels"
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error")
        return res.json(data)
    })
  })


router.post("/add", (req, res) => {  
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
      return res.json(data);
    });
  });
  
router.put("/update/:id", (req, res) => { 
    const levelId = req.params.id;
    const q = "UPDATE levels SET `title`= ?, `hint`= ?, `picture`= ?, `points`= ?, `pass`= ?, `link`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.hint,
      req.body.picture,
      req.body.points,
      req.body.pass,
      req.body.link
    ];
  
    db.query(q, [...values,levelId], (err, data) => {
      if (err) return res.send(err);
      return res.json("Level bol aktualizovany")
    });
  });
  
  
router.delete("/remove/:id", (req, res) => { 
    const levelId = req.params.id;
    const q = "DELETE FROM levels WHERE id = ?"
  
    db.query(q,[levelId], (error, data) => {
        if(error) return res.json("Error")
        return res.json("Level bol zmazaný")
    })
}) 
 
  
router.get("/display/:id", (req, res) => {   
    const levelId = req.params.id;
    const q = "SELECT * FROM levels WHERE id = ?"
      
    db.query(q, [levelId],(error, data) => {   
        if(error) return res.json("error")
        return res.json(data)
    })
  })

module.exports = router;