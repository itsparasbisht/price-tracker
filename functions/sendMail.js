const nodemailer = require("nodemailer");
require("dotenv").config();
const appPass = process.env.GMAIL_PASSWORD;

const fs = require("fs");
const mailBody = fs.readFileSync(`${__dirname}/mailBody.html`).toString();

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "parash@sirpi.io",
    pass: appPass,
  },
});

const sendMail = async () => {
  let info = await transporter.sendMail({
    from: "parash@sirpi.io",
    to: "parasbisht.web@gmail.com",
    subject: "Price Update: Amazon Price Tracker",
    html: mailBody,
  });

  if (info.messageId) {
    console.log("Mail sent, id: ", info.messageId);
  }
};

sendMail().catch((error) => {
  console.log(
    "------------------------Failed to send mail----------------------------"
  );
  console.log(error);
});

module.exports = sendMail;
