// /src/app/page.tsx

'use client'; // Add this to mark this component as a Client Component

import { useState } from 'react';

export default function Page() {
  const [status, setStatus] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/sendemail', {
        method: 'POST',
      });

      if (response.ok) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Error sending email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error sending email.');
    }
  };

  return (
    <div>
      <h1>Test Email from Nodemailer</h1>
      <button onClick={handleSendEmail}>Send Test Email</button>
      <p>{status}</p>
    </div>
  );
}
