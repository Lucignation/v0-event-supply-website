// /emails/adminUserRegistered.js
export default function forgotPassword(user: any) {
    return `
      <html>
        <body>
          <h3>Forgot Password</h3>
          <p>Hello ${user.name},</p>
          <p>Click the link below to reset your password:</p>
          <a href="${user.resetPasswordLink}">Reset Password</a>
          <p>or enter this OTP below into your browser:</p>
          <p>${user.otp}, expires in ${user.expires} minutes</p>
          <p>Best regards,<br>The Team</p>
        </body>
      </html>
    `;
  }
  