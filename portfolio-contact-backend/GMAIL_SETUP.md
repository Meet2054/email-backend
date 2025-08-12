# Gmail App Password Setup Guide

## Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2-factor authentication

## Step 2: Generate App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Click "Generate"
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

## Step 3: Update Your .env File
Replace the placeholder values in your `.env` file:

```env
PORT=5000
EMAIL_USER=your.actual.email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

**Important Notes:**
- Use your full Gmail address (including @gmail.com)
- Remove spaces from the App Password
- Don't include quotes around the values

## Step 4: Restart the Server
After updating the `.env` file, restart your server:
```bash
npm start
```

## Troubleshooting
- If you still get authentication errors, double-check that:
  - 2-factor authentication is enabled
  - You're using the App Password (not your regular Gmail password)
  - The email address is correct
  - There are no extra spaces in the .env file

## Test the Setup
Once configured, you should see:
```
✅ Email server is ready to send messages
```

Instead of the authentication error.
