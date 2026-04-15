# Deployment Guide - Render & Vercel

## 🚀 Deploy Backend to Render

### Step 1: Prepare Your Repository

```bash
# Make sure everything is committed
git add .
git commit -m "🚀 Ready for deployment"
git push origin main
```

### Step 2: Create Render Account & Project

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (authorize access to your repo)
3. Click "New +" → "Web Service"
4. Select your GitHub repository

### Step 3: Configure Render

**Basic Settings:**
- **Name**: `military-asset-backend`
- **Repository**: Select your repository
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**

Click "Add Environment Variable" for each:

| Key | Value | Notes |
|-----|-------|-------|
| `PORT` | `5000` | Default port |
| `NODE_ENV` | `production` | Production mode |
| `MONGODB_URI` | `mongodb+srv://user:password@cluster.mongodb.net/militaryassets` | Your MongoDB connection string |
| `JWT_SECRET` | Generate a strong random string | Use a secure random key |
| `CORS_ORIGIN` | `https://your-vercel-app.vercel.app` | Your frontend URL |

### Step 4: Deploy

Click "Create Web Service" and Render will automatically:
- Deploy your backend
- Assign a public URL (e.g., `https://military-asset-backend.onrender.com`)
- Set up continuous deployment from GitHub

### Step 5: Verify Deployment

```bash
# Test health endpoint
curl https://military-asset-backend.onrender.com/health

# Should return:
# {"status":"Backend is running","timestamp":"2024-04-15T..."}
```

---

## 🎨 Deploy Frontend to Vercel

### Step 1: Prepare Repository (same as above)

```bash
git add .
git commit -m "🚀 Ready for deployment"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 3: Import Project

1. Click "Add New" → "Project"
2. Select your GitHub repository
3. Vercel auto-detects it's a React app

### Step 4: Configure Project

**Settings:**
- **Framework Preset**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: (leave default)
- **Output Directory**: (leave default)

### Step 5: Environment Variables

Click "Environment Variables" and add:

| Key | Value | Scope |
|-----|-------|-------|
| `REACT_APP_API_URL` | `https://military-asset-backend.onrender.com/api` | All |

### Step 6: Deploy

Click "Deploy" and Vercel will:
- Build your React app
- Optimize for production
- Deploy to global CDN
- Provide a public URL (e.g., `https://military-asset-frontend.vercel.app`)

---

## 🔗 Connect Frontend to Backend

After both are deployed:

1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Update `REACT_APP_API_URL` to match your Render backend URL
5. Redeploy (Vercel will automatically redeploy)

---

## 📊 Post-Deployment Checklist

### Backend (Render)

- [ ] Health endpoint responds: `/health`
- [ ] Login endpoint works: `POST /api/auth/login`
- [ ] MongoDB connection successful
- [ ] Environment variables set correctly
- [ ] CORS enabled for frontend URL
- [ ] Logs visible in Render dashboard

### Frontend (Vercel)

- [ ] App loads without errors
- [ ] Can log in with demo credentials
- [ ] Dashboard displays data
- [ ] Assets and Transactions pages work
- [ ] API calls reach backend (check Network tab in DevTools)

### Integration

- [ ] Frontend → Backend communication works
- [ ] Token-based authentication functions
- [ ] Role-based access control works
- [ ] All API endpoints accessible

---

## 🌐 Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Vercel project settings
2. Domains → Add
3. Enter your domain
4. Update DNS records in registrar
5. Wait for DNS propagation (can take 24 hours)

### Render Custom Domain

Similar process in Render dashboard under Settings → Custom Domain

---

## 📈 Monitoring & Logs

### Render Backend Logs
```
Dashboard → Your Service → Logs
```

Common issues:
- MongoDB connection errors
- Missing environment variables
- Port already in use

### Vercel Frontend Logs
```
Dashboard → Your Project → Deployments
```

Click any deployment to see build logs and status.

---

## 🔄 Continuous Deployment

Both platforms support automatic deployment:

1. Push code to GitHub
2. Platforms automatically detect changes
3. Run build and tests
4. Deploy if successful

**To force redeploy:**
- Vercel: Dashboard → Deployments → Redeploy
- Render: Dashboard → Manual Deploy

---

## 🆘 Troubleshooting Deployment

### Frontend Can't Connect to Backend

**Problem**: "Cannot POST /api/auth/login" errors

**Solutions**:
1. Verify `REACT_APP_API_URL` environment variable
2. Check backend is running on Render
3. Ensure CORS is configured in backend
4. Verify MongoDB URI in backend environment

### MongoDB Connection Fails

**Problem**: "Cannot connect to MongoDB" error

**Solutions**:
1. Check connection string is correct
2. Verify IP address is whitelisted in MongoDB Atlas
3. Ensure database user credentials are correct
4. Test connection with MongoDB Compass locally

### Build Fails on Vercel

**Problem**: Build succeeds locally but fails on Vercel

**Solutions**:
1. Check Node.js version matches
2. Verify all dependencies are in package.json
3. Check for environment variables at build time
4. Review build logs in detail

### Render Service Goes to Sleep

**Problem**: Backend responds slowly after inactivity

**Solution**: 
- Upgrade from free tier to paid plan
- Free tier spins down after 15 minutes of inactivity

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Help**: https://www.mongodb.com/support
- **GitHub Issues**: Create issue in your repository

---

## 🎯 Success Indicators

✅ Frontend accessible at public Vercel URL
✅ Backend accessible at public Render URL
✅ Login page loads and accepts credentials
✅ Dashboard displays real data from API
✅ All CRUD operations work end-to-end
✅ Error handling displays meaningful messages
✅ Browser DevTools shows no CORS errors

---

**Congratulations! Your system is now live! 🎉**
