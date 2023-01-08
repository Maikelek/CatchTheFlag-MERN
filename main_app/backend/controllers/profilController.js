const db = require("../db");


const getPoints = (req, res) => { 
    const email = req.body.email;
    console.log()
    const q = "SELECT points FROM users WHERE `email`= ?";
  
  
    db.query(q, [email], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

module.exports = {
    getPoints
};
  