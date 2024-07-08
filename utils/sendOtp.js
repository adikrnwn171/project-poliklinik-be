require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendOtp(email, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    html: `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            }
            .container {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            }
            h1 {
            color: #7126b5;
            margin-top: 0;
            }
            p {
            margin-bottom: 20px;
            }
            .otp {
            background-color: #7126b5;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
            padding: 10px;
            border-radius: 5px;
            width: fit-content;
            margin: 0 auto;
            }
            .box-purple {
            background-color: #7126b5;
            width: 100%;
            padding : 18px;
            height: 150px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            .img-logo {
            max-width: 100%;
            max-height: 100%;
            display: block;
            margin-left: auto;
            margin-right: auto;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>OTP Verification</h1>
            <p>Use the following OTP to verify your account:</p>
            <div class="otp">${otp}</div>
        </div>
        <div class="box-purple">
            <img class="img-logo" src="cid:logo" alt="logo" />
        </div>
        </body>
    </html>
        `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOtp;
