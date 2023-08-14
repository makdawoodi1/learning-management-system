import transporter from "./config.js";

export async function forgotPasswordMail(recipientsEmail, username, token, email) {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_SENDER,
      to: recipientsEmail,
      subject: "Reset Password",
      text: "Reset Password",
      html: `
      <html>
        <body>
            <div>
                <img src="https://codernative.com/assets/images/logo.png" class="mb-4" style="width: 200px;">
            </div>
            <h2>Reset Password Link:</h2>
            <p>Hello ${username},</p>
            <p>We received a request to reset your password. Click the link below to reset your password:</p>
            <p><a href='${process.env.APP_URL_CLIENT}/auth/reset-password?token=${token}&email=${email}'>Password Reset Link</a></p>
            <p>If this request was not made by you please contact us.</p>
            <p>Thank you for choosing <a href="${process.env.SUPPORT_WEBSITE}"> ${process.env.SUPPORT_COMPANY}</a>.</p>
        </body>
    </html>`
    });
  
    console.log("Message sent: %s", info.messageId);
}

export async function resetPassordMail(recipientsEmail) {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_SENDER,
      to: recipientsEmail,
      subject: "Reset Password",
      text: "Reset Password",
      html: `
      <html>
        <body>
            <div>
                <img src="https://codernative.com/assets/images/logo.png" class="mb-4" style="width: 200px;">
            </div>
            <h2>Reset Password Link:</h2>
            <p>Hello,</p>
            <p>Your password has been successfully reset:</p>
            <p>If this request was not made by you please contact us.</p>
            <p>Thank you for choosing <a href="${process.env.SUPPORT_WEBSITE}"> ${process.env.SUPPORT_COMPANY}</a>.</p>
        </body>
    </html>`
    });
  
    console.log("Message sent: %s", info.messageId);
}

export async function registerUserMail(recipientsEmail, username) {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_SENDER,
      to: recipientsEmail,
      subject: "Reset Password",
      text: "Reset Password",
      html: `
      <html>
        <body>
            <div>
                <img src="https://codernative.com/assets/images/logo.png" class="mb-4" style="width: 200px;">
            </div>
            <h2>Welcome to Our Learning Platform, ${username}!</h2>
            <p>Thank you for registering an account with us.</p>
            <p>Thank you for choosing <a href="${process.env.SUPPORT_WEBSITE}"> ${process.env.SUPPORT_COMPANY}</a>.</p>
        </body>
    </html>`
    });
  
    console.log("Message sent: %s", info.messageId);
}

forgotPasswordMail().catch(console.error);
resetPassordMail().catch(console.error);
registerUserMail().catch(console.error);