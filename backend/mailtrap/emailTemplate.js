export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4caf50;
      color: #fff;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .token {
      display: inline-block;
      font-size: 34px;
      font-weight: bold;
      color: #4caf50;
      background-color: #eafaf1;
      padding: 10px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #4caf50;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #777;
      background-color: #e1e1e1;
      padding: 10px;
      border-radius: 0 0 8px 8px;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to MERN Auth!</h1>
    </div>
    <div class="content">
      <p>Hi {{userName}},</p>
      <p>Thank you for signing up. To complete your registration, please verify your email address using the verification token below:</p>
      <p class="button">Verification Token</p>
      <p class="token">{{verificationToken}}</p>
      <p>If you did not create an account, no further action is required.</p>
    </div>
    <div class="footer">
      &copy; {{year}} MERN Auth. All rights reserved.
    </div>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4caf50;
      color: #fff;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: left;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .token {
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
      color: #4caf50;
      background-color: #eafaf1;
      padding: 10px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #4caf50;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #777;
      background-color: #e1e1e1;
      padding: 10px;
      border-radius: 0 0 8px 8px;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hi,</p>
      <p>We received a request to reset your password. You can reset it by clicking the button below:</p>
      <a href="{{resetURL}}" class="button">Reset Your Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
      &copy; {{year}} MERN Auth. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4caf50;
      color: #fff;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: left;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      font-size: 12px;
      color: #777;
      background-color: #e1e1e1;
      padding: 10px;
      border-radius: 0 0 8px 8px;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="content">
      <p>Hi,</p>
      <p>Your password has been successfully reset. You can now use your new password to log in to your account.</p>
      <p>If you did not request this change, please contact our support team immediately.</p>
    </div>
    <div class="footer">
      &copy; {{year}} MERN Auth. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
