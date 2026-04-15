# Environment Variables Guide

## 🔐 Complete Reference

All environment variables needed for development and production deployment.

---

## 📝 Backend Environment Variables

### File: `backend/.env`

```bash
# ===== Server Configuration =====
PORT=5000
NODE_ENV=development              # Use: 'development' or 'production'

# ===== Database Configuration =====
# MongoDB Atlas (Recommended for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/militaryassets

# Local MongoDB (Development)
# MONGODB_URI=mongodb://localhost:27017/militaryassets

# ===== JWT Authentication =====
# Generate secure key: openssl rand -base64 32
JWT_SECRET=your-super-secret-key-here-min-32-chars-recommended

# ===== CORS Configuration =====
# Development
CORS_ORIGIN=http://localhost:3000

# Production (Vercel)
# CORS_ORIGIN=https://military-asset-frontend.vercel.app

# ===== Optional: External Services =====
# SMTP for email notifications (future)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# Sentry for error tracking (future)
# SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### How to Generate JWT_SECRET

```bash
# macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Or use openssl on Windows (with Git Bash)
openssl rand -base64 32
```

---

## 📝 Frontend Environment Variables

### File: `frontend/.env`

```bash
# ===== API Configuration =====

# Local Development
REACT_APP_API_URL=http://localhost:5000/api

# Production with Render backend
# REACT_APP_API_URL=https://your-backend-name.onrender.com/api

# ===== Optional Settings =====
# Debug mode
# REACT_APP_DEBUG=true

# Google Analytics (future)
# REACT_APP_GA_ID=UA-XXXXX-Y

# Sentry Error Tracking (future)
# REACT_APP_SENTRY_DSN=https://xxxx@sentry.io/xxxxx
```

---

## 🔧 Setting Up MongoDB Atlas

### Step 1: Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a project

### Step 2: Create Cluster
1. Click "Create Cluster"
2. Select **M0 (Free)** tier
3. Choose region closest to you
4. Click "Create Cluster"

### Step 3: Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (safe for dev)
4. For production: whitelist specific IPs

### Step 4: Database User
1. Go to "Database Access"
2. Click "Add Database User"
3. Create username and password
4. Grant "readWriteAnyDatabase" role
5. Click "Add User"

### Step 5: Get Connection String
1. Click "Databases"
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js"
5. Copy the connection string
6. Replace `<password>` and `<user>` with your credentials

**Example:**
```
mongodb+srv://user:password@cluster0.mongodb.net/militaryassets
```

---

## 🚀 Production Environment Setup

### Backend on Render

Create these environment variables in Render dashboard:

| Variable | Value | Notes |
|----------|-------|-------|
| `PORT` | `5000` | Fixed port |
| `NODE_ENV` | `production` | Production mode |
| `MONGODB_URI` | Your MongoDB URI | From MongoDB Atlas |
| `JWT_SECRET` | Secure random value | Generate with openssl |
| `CORS_ORIGIN` | Your Vercel frontend URL | For CORS |

### Frontend on Vercel

Create these environment variables in Vercel dashboard:

| Variable | Value | Scope |
|----------|-------|-------|
| `REACT_APP_API_URL` | Your Render backend URL | All environments |

---

## ✅ Verification Checklist

Before deploying, verify:

- [ ] `backend/.env` exists with all required variables
- [ ] `frontend/.env` exists with API URL
- [ ] JWT_SECRET is securely generated (32+ characters)
- [ ] MongoDB URI is correct and tested
- [ ] API URL in frontend matches backend URL
- [ ] No sensitive info in `.env.example` files
- [ ] `.env` files are in `.gitignore`
- [ ] Environment variables are set in Render dashboard
- [ ] Environment variables are set in Vercel dashboard

---

## 🔒 Security Best Practices

### Never Commit Secrets
```bash
# Correct: .env is ignored
git status  # .env should NOT appear

# Add to .gitignore if not already there
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

### Rotate JWT_SECRET
```bash
# Generate new secret
openssl rand -base64 32

# Update in production:
# - Render Dashboard
# - Redeploy backend to activate
```

### Monitor Sensitive Variables
- Never log JWT tokens or passwords
- Use sanitized logs in production
- Implement request logging that redacts sensitive data

---

## 🧪 Testing Variables

### Local Development
```bash
# backend/.env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/militaryassets
JWT_SECRET=test-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000

# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
```

### With Docker
```bash
# Already configured in docker-compose.yml
# No need to change .env files unless customizing
```

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check URI format
mongodb+srv://user:password@cluster.mongodb.net/database

# Common issues:
# ❌ Using << >> characters (URL encode them)
# ❌ Wrong password (copy from Dashboard)
# ❌ IP whitelist (allow 0.0.0.0/0 in development)
```

### "CORS error in frontend"
```bash
# Verify CORS_ORIGIN in backend .env matches frontend URL
# Frontend: https://app.vercel.app
# Backend CORS_ORIGIN should be: https://app.vercel.app
```

### "Invalid JWT Secret"
```bash
# JWT_SECRET should be:
# - At least 32 characters
# - Random and unique
# - Base64 encoded (from openssl)
```

---

## 📚 Environment Variable References

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Node.js dotenv Package](https://github.com/motdotla/dotenv)

---

## 🔄 Updating Environment Variables

### For Local Development
```bash
# Edit .env file
nano backend/.env
# Restart backend
npm run dev
```

### For Production (Render)
```bash
# 1. Go to Render Dashboard
# 2. Select your service
# 3. Go to Environment tab
# 4. Edit variables
# 5. Click "Save" (auto-deploys)
```

### For Production (Vercel)
```bash
# 1. Go to Vercel Dashboard
# 2. Select your project
# 3. Go to Settings → Environment Variables
# 4. Add or edit variables
# 5. Redeploy (or push to trigger auto-deploy)
```

---

**Last Updated: April 2026**
