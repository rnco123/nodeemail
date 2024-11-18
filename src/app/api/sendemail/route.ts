// src/app/api/sendemail/route.ts

import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'raheelhussainco@gmail.com',
      subject: 'Test Email from Nodemailer',
      text: 'This is a test email sent using Nodemailer and Gmail SMTP.',
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending email.' }), {
      status: 500,
    });
  }
}
