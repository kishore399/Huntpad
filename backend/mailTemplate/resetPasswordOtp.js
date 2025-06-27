
export const resetPasswordMail = (NAME, OTP) => {
    return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 20px;text-align: center;">
        <div style="max-width: 600px; background: #ffffff; padding: 30px; border-radius: 8px; margin: auto;">
          <h2 style="color: #ef4444;text-align: center;">Reset Your Password</h2>
          <p style="font-size: 16px;text-align: left;">Hi ${NAME},</p>
          <p style="font-size: 16px;text-align: left;">We received a request to reset your password. Use the OTP below to proceed:</p>
          <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #111;text-align: center;">${OTP}</div>
          <p style="font-size: 14px; color: #555;text-align: center;">If you didn't request this, you can safely ignore this email.</p>
          <p style="margin-top: 30px;text-align: center;">— HuntPad Security Team</p>
        </div>
      </body>
    </html>
    `
}