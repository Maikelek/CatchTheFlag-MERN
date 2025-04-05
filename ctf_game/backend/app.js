const express = require('express'); 
const cors = require("cors"); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

require("dotenv").config();

const app = express()

app.use(cookieParser());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"], //has to be changed in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(
  session({
    key: "user",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 86400000 // 1 day
    }
  })
);

/* Backend main page */
app.get("/", (req, res) => { 
  return res.json("Backend server");

})

/* Routes */
const levelRouter = require('./routes/levelRouter');
app.use('/level', levelRouter);

const userRouter = require('./routes/userRouter');
app.use('/user', userRouter);

const registerRouter = require('./routes/registerRouter');
app.use('/register', registerRouter);

const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

const answerRouter = require('./routes/answerRouter');
app.use('/answer', answerRouter);

const profileRouter = require('./routes/profileRouter');
app.use('/profile', profileRouter);

const adminRouter = require('./routes/adminRouter');
app.use('/admin', adminRouter);

/* Application port*/ 
app.listen(process.env.PORT, () => {      
    console.log("Backend is on port " + process.env.PORT);
})
