
export const welcomeMail = (NAME) => {
    return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #e0f7fa; margin: 0; padding: 20px;text-align: center;">
        <div style="max-width: 600px; background: #ffffff; padding: 30px; border-radius: 8px; margin: auto;">
          <h2 style="color: #10b981;">Welcome aboard, ${NAME}!</h2>
          <p style="font-size: 16px;">We're excited to have you with us. Your account is now verified and you're ready to start exploring.</p>
          <p style="font-size: 14px; color: #555;">Let us know if you have any questions or feedback.</p>
          <p style="margin-top: 30px;">Cheers,<br/>The HuntPad Team</p>
        </div>
      </body>
    </html>
    `
}