import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Detailed Environment Debug');
console.log('=============================');
console.log('PORT:', process.env.PORT);
console.log('EMAIL_USER:', `"${process.env.EMAIL_USER}"`);
console.log('EMAIL_PASS:', `"${process.env.EMAIL_PASS}"`);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);
console.log('EMAIL_PASS contains spaces:', process.env.EMAIL_PASS?.includes(' '));

console.log('\n📝 .env file should look like this:');
console.log('PORT=5000');
console.log('EMAIL_USER=your.email@gmail.com');
console.log('EMAIL_PASS=nsmfbqsxxqrxawxn');
console.log('\n❌ Common mistakes:');
console.log('- EMAIL_PASS=nsmf bqsx xqrx awxn  (has spaces)');
console.log('- EMAIL_PASS="nsmfbqsxxqrxawxn"   (has quotes)');
console.log('- EMAIL_PASS= nsmfbqsxxqrxawxn    (has leading space)');
console.log('- EMAIL_PASS=nsmfbqsxxqrxawxn     (has trailing space)');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('\n❌ Missing environment variables!');
  process.exit(1);
}

if (process.env.EMAIL_PASS.includes(' ')) {
  console.log('\n⚠️  WARNING: Your EMAIL_PASS contains spaces!');
  console.log('Remove all spaces from the App Password.');
}

if (process.env.EMAIL_PASS.includes('"') || process.env.EMAIL_PASS.includes("'")) {
  console.log('\n⚠️  WARNING: Your EMAIL_PASS contains quotes!');
  console.log('Remove all quotes from the App Password.');
}

console.log('\n✅ Environment variables loaded successfully!');
