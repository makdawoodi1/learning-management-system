import nodemailer from "nodemailer";

// Setup transporter using SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    pool: true,
    auth: {
      user: "qayyumfahmeed@gmail.com",
      pass: "mlyvrjyligyhumau"
    }
});

export default transporter;