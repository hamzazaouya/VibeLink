import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

// create transporter (SMTP config)
const transporter = nodemailer.createTransport({
  service: "gmail", // or outlook, yahoo, etc.
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD, 
  },
});

async function sendMail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_APP_EMAIL,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}

async function sendVerifMail(to: string, username: string, id: string, url: string) {
  const emailContent = `
    Hello ${username},

    Thank you for signing up!
    To verify your email address, please use the code below:

    Verification Code: ${id}

    Or you can click the link below to verify directly:
    ${url}

    If you did not request this, please ignore this email.

    Best regards,
    VibeLink Team
  `;
  await sendMail(to, "VibeLink Email Verification", emailContent);
}

export default sendVerifMail;