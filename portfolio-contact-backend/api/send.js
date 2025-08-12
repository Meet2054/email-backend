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
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);

    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing fields - name:', !!name, 'email:', !!email, 'message:', !!message);
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required'
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
        error: 'Failed to send email. Please try again later.'
      });
    }
  }
}
