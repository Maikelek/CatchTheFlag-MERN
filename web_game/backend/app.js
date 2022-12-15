const express = require('express'); 
const cors = require("cors");   

const app = express()
app.use(express.urlencoded({ extended: true }));    
app.use(express.json());
app.use(cors());


/* Hlavna stránka backendu */
app.get("/", (req, res) => { 
  return res.json("Backend server Hack The Maturita");

})

/* Routes */
const levelRouter = require('./routes/levelRouter');
app.use('/level', levelRouter)

const userRouter = require('./routes/userRouter');
app.use('/user', userRouter)

const registerRouter = require('./routes/registerRouter');
app.use('/register', registerRouter);

const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

/*Port aplikácie*/ 
app.listen(8800, () =>{      
    console.log("Backend is on port 8800");
})