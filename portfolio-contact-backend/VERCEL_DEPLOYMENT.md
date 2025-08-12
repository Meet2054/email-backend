# 🚀 Vercel Deployment Guide (Free)

## ✅ Why Vercel is Great for Your Project
- **Completely Free** - No credit card required
- **Serverless Functions** - Perfect for contact forms
- **Global CDN** - Fast worldwide
- **Automatic Deployments** - From GitHub
- **Never Sleeps** - Always available

## 📋 Prerequisites
1. GitHub account with your code pushed
2. Vercel account (free signup)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Code
Make sure your project structure looks like this:
```
portfolio-contact-backend/
├── package.json
├── server.js
├── vercel.json          ← New file
├── .gitignore
└── node_modules/        ← Will be installed automatically
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from your project folder:
   ```bash
   cd portfolio-contact-backend
   vercel
   ```

3. Follow the prompts:
   - Link to existing project? → `N` (new project)
   - Project name → `portfolio-contact-backend`
   - Directory → `./` (current directory)

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Node.js project
5. Click "Deploy"

### Step 3: Set Environment Variables
In your Vercel dashboard:
1. Go to your project → "Settings" → "Environment Variables"
2. Add these variables:
   - `EMAIL_USER` = `meetmikey2054@gmail.com`
   - `EMAIL_PASS` = `nsmfbqsxxqrxawxn`
   - `NODE_ENV` = `production`

### Step 4: Your API URLs
After deployment, your API will be available at:
```
https://your-project-name.vercel.app
```

## 🔧 Update Your Frontend
Change your fetch calls from:
```javascript
fetch("http://localhost:5000/send", {
```
To:
```javascript
fetch("https://your-project-name.vercel.app/send", {
```

## 🧪 Test Your Deployed API
- **Health Check:** `https://your-project-name.vercel.app/health`
- **Send Email:** `POST https://your-project-name.vercel.app/send`

## 📧 Test with Postman
1. **GET Request:**
   - URL: `https://your-project-name.vercel.app/health`
   - Expected: `{"status":"OK","message":"Server is running"}`

2. **POST Request:**
   - URL: `https://your-project-name.vercel.app/send`
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "message": "Hello from Vercel!"
   }
   ```

## ⚡ Vercel Advantages
- ✅ **Always Online** - No sleeping
- ✅ **Global CDN** - Fast worldwide
- ✅ **Automatic HTTPS** - Secure by default
- ✅ **Zero Configuration** - Works out of the box
- ✅ **Free Tier** - Generous limits

## 🔄 Automatic Deployments
- Every push to your GitHub main branch triggers a new deployment
- Preview deployments for pull requests
- Instant rollbacks if needed

## 🎯 Perfect for Portfolio Projects
Vercel is ideal for portfolio contact forms because:
- Low traffic is perfect for serverless
- Always available when someone visits your portfolio
- No maintenance required
- Professional URLs

## 🚨 Important Notes
- Environment variables are encrypted and secure
- Each deployment gets a unique URL
- You can add custom domains later
- Free tier includes 100GB bandwidth/month
