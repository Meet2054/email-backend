import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Email Configuration Debug');
console.log('============================');
console.log('PORT:', process.env.PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set (' + process.env.EMAIL_PASS.length + ' chars)' : '❌ Missing');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('\n❌ Missing environment variables!');
  console.log('Please check your .env file contains:');
  console.log('EMAIL_USER=your.email@gmail.com');
  console.log('EMAIL_PASS=your_16_character_app_password');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

console.log('\n🧪 Testing email configuration...');

// Test the connection
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure 2-factor authentication is enabled');
    console.log('2. Generate a new App Password from Google Account settings');
    console.log('3. Use the full Gmail address (including @gmail.com)');
    console.log('4. Remove all spaces from the App Password');
    console.log('5. Don\'t include quotes around values in .env file');
  } else {
    console.log('✅ Email configuration is working!');
    console.log('🚀 Your server is ready to send emails');
  }
  process.exit(0);
});
