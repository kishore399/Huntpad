
export const welcomeBackMail = (NAME) => {
    return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; background: #ffffff; padding: 30px; border-radius: 8px; margin: auto; text-align: center;">
          <h2 style="color: #0ea5e9;">Welcome back, ${NAME}! 👋</h2>
          <p style="font-size: 16px;">You just logged in to YourApp.</p>
          <p style="font-size: 14px; color: #555;">If this wasn't you, please <span style="color: #ef4444;">secure your account</span> immediately.</p>
          <p style="margin-top: 30px;">We're happy to have you back!</p>
          <p>— The HuntPad Team</p>
        </div>
      </body>
    </html>
    `
}