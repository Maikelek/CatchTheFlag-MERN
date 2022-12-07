const express = require('express'); 
const cors = require("cors");   

const app = express()
app.use(express.urlencoded({ extended: true }));    
app.use(express.json());
app.use(cors())


/* Hlavna stránka backendu */
app.get("/", (req, res) => { 
  return res.json("Backend server Hack The Maturita")

})

/* Routes */
const levelRouter = require('./routes/levelRouter');
app.use('/level', levelRouter)

const userRouter = require('./routes/userRouter');
app.use('/user', userRouter)

/*Port aplikácie*/ 
app.listen(8800, () =>{      
    console.log("Backend ide na porte 8800")
})