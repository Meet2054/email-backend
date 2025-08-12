import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Debug logging
    console.log('=== REQUEST DEBUG ===');
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    console.log('Raw body:', req.body);
    console.log('Body type:', typeof req.body);
    console.log('Body keys:', Object.keys(req.body || {}));
    console.log('====================');

    // Handle different body formats
    let body = req.body;
    
    // If body is a string, try to parse it
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.log('Failed to parse string body:', e);
      }
    }

    // If body is still not an object, try to get it from raw body
    if (!body || typeof body !== 'object') {
      console.log('Body is not an object, trying alternative approach');
      // Try to get from raw body if available
      if (req.rawBody) {
        try {
          body = JSON.parse(req.rawBody);
        } catch (e) {
          console.log('Failed to parse raw body:', e);
        }
      }
    }

    console.log('Processed body:', body);

    const { name, email, message } = body || {};

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing fields - name:', !!name, 'email:', !!email, 'message:', !!message);
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required',
        debug: {
          receivedBody: body,
          name: !!name,
          email: !!email,
          message: !!message
        }
      });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from your portfolio contact form</small></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error.message);
    
    if (error.code === 'EAUTH') {
      res.status(500).json({
        error: 'Email authentication failed. Please check your Gmail App Password setup.'
      });
    } else {
      res.status(500).json({
        error: 'Failed to send email. Please try again later.',
        debug: error.message
      });
    }
  }
} 
