import nodemailer from "nodemailer";

// Setup transporter using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 465,
    pool: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
    }
});

export default transporter;