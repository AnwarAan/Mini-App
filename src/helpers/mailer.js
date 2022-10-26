import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  port: 465,
  secure: true,
  auth: {
    user: "anwaraan998@gmail.com",
    pass: process.env.PASS_APP,
  },
});

export default mailer;
