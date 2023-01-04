const db = require("../db");

const answerChecker = async (req, res) => {
  
  const levelID = req.body.id;
  const userID = req.body.logged;
  const answer = req.body.answer.answer;
  let done;

  db.query("SELECT * FROM `user_levels` WHERE userID = ? AND levelID = ?", [userID, levelID], (error, response) => {
    if (response.length > 0) {
      done = 1;
    } else {
      done = 0;
    }
  });

  if (!answer) {
    return res.json({ message: "Nezadal si heslo !"});
  }

  
  db.query("SELECT * FROM `levels` WHERE id = ?", [levelID], (error, results) => {
    const pass = results[0].pass;
    const levelPoints = results[0].points;

    if ( answer == pass ) {

      if ( done === 1 ){
       return res.json({ message: "Level si už vyplnil !"});
      } else {

        db.query("SELECT points FROM `users` WHERE id = ?", [userID], (error, response) => {
          const userPoints = response[0].points;
          const pointsToAdd = userPoints + levelPoints;
  
          db.query("UPDATE users SET `points`= ? WHERE id = ?", [pointsToAdd, userID]);
  
        });
        db.query("INSERT INTO user_levels VALUES (?, ?)", [userID, levelID]);
  
        return res.json({ message: "ok"});
        
      }
       
    } else {
      return res.json({ message: "Neplatné heslo !"});
    }
  });
};

const getLevelsAndDone = (req, res) => {   
  userID = req.body.id;
  const q = "SELECT id, title FROM levels";

  db.query(q, (error, levels) => {   
      if(error) return res.json("error");

      const query = "SELECT levelID FROM user_levels WHERE userID = ?";

      db.query(query,[userID], (error, done) => {   
        if(error) return res.json("error");
        return res.json({done, levels});
    })
  })

};

  module.exports = {
    answerChecker,
    getLevelsAndDone
};
