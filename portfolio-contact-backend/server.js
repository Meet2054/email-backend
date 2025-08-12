import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('⚠️  Email configuration error:', error.message);
    console.log('📧 Please check your .env file and Gmail App Password setup');
    console.log('🔗 For help: https://support.google.com/mail/?p=BadCredentials');
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// POST endpoint for contact form submissions
app.post('/send', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    console.log('Content-Type:', req.headers['content-type']); // Debug log
    
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing fields - name:', !!name, 'email:', !!email, 'message:', !!message); // Debug log
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required'
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
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

    res.json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error.message);
    
    // Provide more specific error messages
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
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test endpoint to check request handling
app.post('/test', (req, res) => {
  console.log('Test endpoint - Headers:', req.headers);
  console.log('Test endpoint - Body:', req.body);
  res.json({ 
    message: 'Test endpoint working',
    body: req.body,
    headers: req.headers
  });
});

// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

// Export for Vercel
export default app;

/*
FRONTEND USAGE EXAMPLE (React):

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };

  try {
    const res = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    if (data.success) {
      alert('Message sent successfully!');
      e.target.reset(); // Clear form
    } else {
      alert(data.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message');
  }
};

HTML FORM EXAMPLE:
<form onSubmit={handleSubmit}>
  <input type="text" name="name" placeholder="Your Name" required />
  <input type="email" name="email" placeholder="Your Email" required />
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>
*/
