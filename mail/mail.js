import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function forgotPasswordMail(
  recipientsEmail,
  username,
  token,
  email
) {
  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_SENDER,
    to: recipientsEmail,
    subject: "Forgot Password",
    text: "Forgot Password",
    html: `
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="/styles/forgotPassword.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                }
                
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                
                .logo {
                    width: 100px;
                    height: 100px;
                    display: inline-block;
                }
                
                .content {
                    padding: 20px 0;
                }
                
                .message {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
                
                .button-container {
                    text-align: center;
                }
                
                .reset-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Forgot Password</h1>
                </div>
                <div class="content">
                    <p class="message">${username} You've requested a password reset. To reset your password, click the button below:</p>
                    <div class="button-container">
                        <a href="${process.env.APP_URL_CLIENT}/reset-password?token=${token}" class="reset-button">Reset Password</a>
                    </div>
                </div>
                <div class="footer">
                    <p>If you didn't request a password reset, please ignore this email.</p>
                    <p>&copy; ${new Date().getFullYear()} ${process.env.SUPPORT_COMPANY}</p>
                </div>
            </div>
        </body>
      </html>`,
  });

  console.log("Message sent: %s", info.messageId);
}

export async function resetPassordMail(recipientsEmail) {
  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_SENDER,
    to: recipientsEmail,
    subject: "Password Reset Successful",
    text: "Password Reset Successful",
    html: `
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="/styles/resetPassword.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                }
                
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                
                .logo {
                    width: 100px;
                    height: 100px;
                    display: inline-block;
                }
                
                .content {
                    padding: 20px 0;
                }
                
                .message {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
                
                .button-container {
                    text-align: center;
                }
                
                .login-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Successful</h1>
                </div>
                <div class="content">
                    <p class="message">Your password has been successfully reset. You can now log in using the button below:</p>
                    <div class="button-container">
                        <a href="${process.env.APP_URL_CLIENT}/login" class="login-button">Log In</a>
                    </div>
                </div>
                <div class="footer">
                    <p>If you have any questions or need assistance, please contact our support team.</p>
                    <p>&copy; ${new Date().getFullYear()} ${process.env.SUPPORT_COMPANY}</p>
                </div>
            </div>
        </body>
      </html>`,
  });

  console.log("Message sent: %s", info.messageId);
}

export async function registerUserMail(recipientsEmail, username) {
  // // Read the CSS file and image file
  // const stylesPath = path.join(__dirname, 'public/styles/registerUser.css');
  // const imagePath = path.join(__dirname, 'public/images/logo.png');

  // const styles = fs.readFileSync(stylesPath, 'utf-8');
  // const imageData = fs.readFileSync(imagePath);

  // // Encode the image data as a data URI
  // const imageSrc = `data:image/png;base64,${imageData.toString('base64')}`;

  // <img src="../public/images/logo.png" alt="Company Logo" class="logo" />

  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_SENDER,
    to: recipientsEmail,
    subject: "New User Registration",
    text: "New User Registration",
    html: `
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="../public/styles/registerUser.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
              
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                }
              
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                
                .logo {
                    width: 100px;
                    height: 100px;
                    display: inline-block;
                }
                
                .content {
                    padding: 20px 0;
                }
                
                .message {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
                
                .button-container {
                    text-align: center;
                }
                
                .register-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #888888;
                }       
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to Our Platform</h1>
                </div>
                <div class="content">
                    <p class="message">Thank you ${username} for registering with us. You're now a member of this platform.</p>
                </div>
                <div class="footer">
                    <p>If you have any questions or need assistance, please contact our support team.</p>
                    <p>&copy; ${new Date().getFullYear()} ${process.env.SUPPORT_COMPANY}</p>
                </div>
            </div>
        </body>
    </html>`,
  });

  console.log("Message sent: %s", info.messageId);
}

forgotPasswordMail().catch(console.error);
resetPassordMail().catch(console.error);
registerUserMail().catch(console.error);
