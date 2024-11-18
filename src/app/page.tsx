import { GetServerSideProps } from 'next';
import nodemailer from 'nodemailer';

interface Props {
  emailStatus: string;
}

const Home = ({ emailStatus }: Props) => {
  return (
    <div>
      <h1>Test Email from Nodemailer</h1>
      <p>{emailStatus}</p>
    </div>
  );
};

// Send the email from the server-side using Nodemailer
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Set up Nodemailer transport using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use STARTTLS (not SSL)
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail App Password
      },
    });

    // Define email content (text only)
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender's email address
      to: 'recipient@example.com', // Replace with the recipient email address
      subject: 'Test Email from Nodemailer',
      text: 'This is a test email sent using Nodemailer and Gmail SMTP.',
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success message
    return {
      props: {
        emailStatus: 'Email sent successfully!',
      },
    };
  } catch (error) {
    console.error('Error sending email:', error);

    // Return error message
    return {
      props: {
        emailStatus: 'Error sending email.',
      },
    };
  }
};

export default Home;
