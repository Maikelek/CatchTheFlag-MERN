const db = require("../db");  

const getLevels = (req, res) => {   
    const q = "SELECT id, title, points FROM levels";
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.send(data);
    })
};
   
const getLevelByID = (req, res) => {   
    const levelId = req.params.id;
    const q = "SELECT id, title, hint, picture, points, link FROM levels WHERE id = ?";
      
    db.query(q, [levelId],(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
};

module.exports = {
    getLevels,
    getLevelByID
};