const nodemailer = require("nodemailer");
// const dotenv = require('dotenv')
// dotenv.config()
// async..await is not allowed in global scope, must use a wrapper
module.exports.connect= async (to, luckyNumber, name)=>{
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
      subject: `Welcome to Let's Build`, // Subject line
      text:
      `
Hey, ${name},

Welcome!

You've successfully completed registration for Let's Build; the workshop conducting by Department of Vocational Studies, Software Development Farook College ( Autonomous ).
Please visit https://notion.so for more details

Note
Your Lucky Number is ${luckyNumber}

Have an Octotastic day! 
      `, // plain text body
    }, err=>{
      if(err) console.log(err);
      else console.log('Mail has been sent');
    });
  }