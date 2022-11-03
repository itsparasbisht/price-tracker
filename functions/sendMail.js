const nodemailer = require("nodemailer");
require("dotenv").config();
const appPass = process.env.GMAIL_PASSWORD;

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
    subject: "Testing the dev",
    html: "<div><b>Hello there...</b><br /> <img src='https://i.quotev.com/l7jmhx3sppoa.jpg' /></div>",
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
