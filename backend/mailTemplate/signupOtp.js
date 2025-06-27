
export const signupOtpMail = (NAME,OTP) => {
    return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;text-align: center">
        <div style="max-width: 600px; background: #ffffff; padding: 30px; border-radius: 8px; margin: auto;text-align: center">
          <h2 style="color: #7c3aed;">Welcome, ${NAME}!</h2>
          <p style="font-size: 16px;">Thank you for signing up. Please use the OTP below to verify your email address:</p>
          <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #111;">${OTP}</div>
          <p style="font-size: 14px; color: #555;">This OTP is valid for 30 minutes. If you didn't request this, please ignore this email.</p>
          <p style="margin-top: 30px;">— HuntPad Team</p>
        </div>
      </body>
    </html>
    `
}