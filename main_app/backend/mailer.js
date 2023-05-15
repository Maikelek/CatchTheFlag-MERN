const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});


function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject,
    text
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email has been sent: ' + info.response);
    }
  });
}

module.exports = sendEmail;

