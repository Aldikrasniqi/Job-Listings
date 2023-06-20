const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '1a12a4007bfcd5',
    pass: 'fbeac64549c340',
  },
});

module.exports = {
  sendVerificationEmail: async (emailTo, verificationToken) => {
    await transporter.sendMail({
      from: '"Job Listings" <JobListingsService@test.com>',
      to: emailTo,
      subject: 'Account Verification',
      text:
        'To verify your account pease visit this link: http://localhost:4001/auth/verify-account/' +
        verificationToken,
      html: `<div>
          <b>To verify your account pease press the button below</b>
          <a href="http://localhost:4001/auth/verify-account/${verificationToken}">Verify Account</a>
        <div>`,
    });
  },
  sendResetPasswordLink: async (emailTo, token) => {
    await transporter.sendMail({
      from: '"Bootcamp 3" <bootcamo3@test.com>',
      to: emailTo,
      subject: 'Forgot Password?',
      text:
        'A request for resetting your password was submitted. Follow the link below to reset your password. If you did not request it, please ignore this email http://localhost:3001/reset-password/' +
        token,
      html: `<div>
          <p>A request for resetting your password was submitted. Follow the link below to reset your password. If you did not request it, please ignore this email</p>
          <a href="http://localhost:3001/reset-password/${token}">Reset Password</a>
          </div>`,
    });
  },
};
