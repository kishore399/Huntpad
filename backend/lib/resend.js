import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY
const resend = new Resend(API_KEY);

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const response = await resend.emails.send({
      from: 'HuntPad <onboarding@resend.dev>',
      to,
      subject,
      html: htmlContent,
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
