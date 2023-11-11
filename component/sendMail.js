const nodemailer = require("nodemailer");
// send mail function
const sendMail = async (email, userName, randomPassword, type) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shaiksameer13k@gmail.com",
      pass: "zzqeoiiwodwvncdz",
    },
  });

  const info = await transporter.sendMail({
    from: "<shaiksameer13k@gmail.com>",
    to: email,
    subject: "Password Received Successfully",
    text: `Hello ${userName}`,
    html:
      type == "forgotPassword"
        ? `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
      
          .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
      
          h1 {
            color: #007bff;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <h1>Password Reset</h1>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your password has been reset successfully.</p>
          <p>Here are your updated login details:</p>
          <p><strong>Username:</strong> ${userName}</p>
          <p><strong>Password:</strong> ${randomPassword}</p>
          <p>If you did not request this password reset, please contact our support team immediately.</p>
          <p>Best regards,<br> The Support Team</p>
        </div>
      </body>
      
      </html>
      `
        : type == "changePassword"
        ? `<!DOCTYPE html>
          <html lang="en">
          
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Changed</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
              }
          
              .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
          
              h1 {
                color: #007bff;
              }
            </style>
          </head>
          
          <body>
            <div class="container">
              <h1>Password Changed Successfully</h1>
              <p>Hello <strong>${userName}</strong>,</p>
              <p>Your password has been changed successfully.</p>
              <p>Here are your updated login details:</p>
          <p><strong>Username:</strong> ${userName}</p>
          <p><strong>Password:</strong> ${randomPassword}</p>
              <p>If you did not initiate this change, please contact our support team immediately.</p>
              <p>Best regards,<br> The Support Team</p>
            </div>
          </body>
          
          </html>`
        : `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
      
          .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
      
          h1 {
            color: #007bff;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <h1>Welcome to Our Website</h1>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your account has been created successfully.</p>
          <p>Here are your login details:</p>
          <p><strong>Username:</strong> ${userName}</p>
          <p><strong>Password:</strong> ${randomPassword}</p>
          <p>Thank you for joining our website. We're excited to have you with us!</p>
          <p>Best regards,<br> The Team</p>
        </div>
      </body>
      
      </html>
      `,
  });
};

module.exports = sendMail;
