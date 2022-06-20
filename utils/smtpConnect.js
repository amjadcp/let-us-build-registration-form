const nodemailer = require("nodemailer");
// const dotenv = require('dotenv')
// dotenv.config()
// async..await is not allowed in global scope, must use a wrapper
module.exports.connect= async (to, text)=>{
    console.log('email : ',process.env.EMAIL);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "temp2033mail@gmail.com",
        pass: process.env.PASS
      }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: to ? to : [process.env.EMAIL], // list of receivers
      subject: 'Registration Completed', // Subject line
      text: text, // plain text body
      //html: "<b>Hello world?</b>", // html body
    }, err=>{
      if(err) console.log(err);
      else console.log('Mail has been sent');
    });
  }