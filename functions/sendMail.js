const nodemailer = require("nodemailer");
require("dotenv").config();
const appPass = process.env.GMAIL_PASSWORD;

const title =
  "CHROES® Men's Fall Winter Office Single Breasted Long Dress Wool Coat Overcoat";
const imageUrl = "https://m.media-amazon.com/images/I/41ZvSZbAKRL._UL1001_.jpg";
const price = "5000";
const productUrl =
  "https://www.amazon.in/CHROES%C2%AE-Winter-Office-Breasted-Overcoat/dp/B0B9WWQRR2";
const mailTemplate = require("./mailBody");
const mailContent = mailTemplate(title, imageUrl, price, productUrl);

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
    html: mailContent,
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
