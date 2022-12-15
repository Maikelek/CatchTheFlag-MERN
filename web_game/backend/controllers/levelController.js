const db = require("../db");  


const getLevels = (req, res) => {   
    const q = "SELECT * FROM levels";
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
};


const createLevel = (req, res) => {  
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
};
  
const updateLevel = (req, res) => { 
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
};
  
  
const deleteLevel = (req, res) => { 
    const levelId = req.params.id;
    const q = "DELETE FROM levels WHERE id = ?";
  
    db.query(q,[levelId], (error, data) => {
        if(error) return res.json("Error");
        return res.json("Level bol zmazaný");
    })
}; 
 
  
const getLevelByID = (req, res) => {   
    const levelId = req.params.id;
    const q = "SELECT * FROM levels WHERE id = ?";
      
    db.query(q, [levelId],(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
  }

module.exports = {
    getLevels,
    createLevel,
    updateLevel,
    deleteLevel,
    getLevelByID
};