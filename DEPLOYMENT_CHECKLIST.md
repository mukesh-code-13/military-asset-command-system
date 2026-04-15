# Production Deployment Checklist

## 📋 Pre-Deployment (1-2 hours)

### Code Quality
- [ ] Run linter on backend: `npm run lint` (if configured)
- [ ] Check for console.log statements (remove debugging code)
- [ ] Verify no API keys in code
- [ ] Verify no hardcoded credentials
- [ ] Check for any `TODO` or `FIXME` comments
- [ ] Run tests (if any): `npm test`

### Documentation
- [ ] Update README.md with deployment links
- [ ] Update DEPLOYMENT.md with actual URLs
- [ ] Document any custom configurations
- [ ] Create deployment runbook
- [ ] Document rollback procedures

### Security
- [ ] Generate new JWT_SECRET
- [ ] Ensure .env files are in .gitignore
- [ ] Verify no secrets in git history
- [ ] Check for CORS whitelist in production
- [ ] Enable HTTPS (automatic with Render/Vercel)
- [ ] Set up rate limiting (future enhancement)

### Testing
- [ ] Test all authentication flows locally
- [ ] Test CRUD operations with demo data
- [ ] Test with Docker: `docker-compose up`
- [ ] Test error handling and edge cases
- [ ] Verify API responses with Network tab

---

## 🎯 Render Backend Deployment

### GitHub Preparation
- [ ] Commit all changes: `git add . && git commit -m "..."`
- [ ] Push to main branch: `git push origin main`
- [ ] Verify code on GitHub

### Render Setup (10-15 minutes)
- [ ] Create Render account at render.com
- [ ] Connect GitHub (authorize permissions)
- [ ] Create new Web Service
- [ ] Select repository and main branch
- [ ] Set Root Directory to `backend`

### Render Configuration
- [ ] Set Runtime: **Node**
- [ ] Build Command: **npm install**
- [ ] Start Command: **npm start**
- [ ] Set Environment Variables:
  - [ ] `PORT` = `5000`
  - [ ] `NODE_ENV` = `production`
  - [ ] `MONGODB_URI` = Your MongoDB connection string
  - [ ] `JWT_SECRET` = Generated secret (openssl rand -base64 32)
  - [ ] `CORS_ORIGIN` = Your Vercel frontend URL

### Verification
- [ ] Wait for deployment to complete
- [ ] Check Render logs for errors
- [ ] Test health endpoint:
  ```bash
  curl https://your-backend.onrender.com/health
  ```
- [ ] Verify database connection in logs
- [ ] Note the backend URL for frontend configuration

### Post-Deployment
- [ ] Set up email alerts in Render (optional)
- [ ] Enable auto-deploy from GitHub
- [ ] Monitor memory usage
- [ ] Watch logs for first 24 hours

---

## 🎨 Vercel Frontend Deployment

### GitHub Preparation
- [ ] Code already pushed in previous step
- [ ] Create production build locally: `npm run build`
- [ ] Test production build: `serve -s build`

### Vercel Setup (10-15 minutes)
- [ ] Create Vercel account at vercel.com
- [ ] Connect GitHub (authorize permissions)
- [ ] Import project

### Vercel Configuration
- [ ] Framework Preset: **Create React App**
- [ ] Root Directory: **frontend**
- [ ] Build Command: (leave default)
- [ ] Output Directory: **build**
- [ ] Set Environment Variables:
  - [ ] `REACT_APP_API_URL` = Your Render backend URL (e.g., https://app-backend.onrender.com/api)

### Verification
- [ ] Wait for deployment to complete
- [ ] Check all pages load without errors
- [ ] Verify API calls in Network tab
- [ ] Test login with demo credentials
- [ ] Test all major features
- [ ] Check for CORS errors in console

### Post-Deployment
- [ ] Get Vercel deployment URL
- [ ] Update backend CORS_ORIGIN if needed (redeploy)
- [ ] Set up custom domain (optional)
- [ ] Enable auto-deploy from GitHub
- [ ] Configure deployment preview (optional)

---

## 🔗 Connect Backend & Frontend

### Update CORS
1. Go to Render Dashboard
2. Select backend service
3. Go to Environment tab
4. Update `CORS_ORIGIN` to your Vercel URL
5. Click Save (triggers redeploy)

### Update Frontend API URL
1. Go to Vercel Dashboard
2. Select project
3. Settings → Environment Variables
4. Update `REACT_APP_API_URL` to your Render URL
5. Redeploy or push to trigger deployment

### Test Connection
```bash
# Test from local machine
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@military.mil","password":"AdminPass123!"}'
```

---

## 📊 Post-Deployment Monitoring (24 hours)

### Immediate (0-1 hour)
- [ ] Monitor Render logs for errors
- [ ] Monitor Vercel deployment
- [ ] Check error tracking (if Sentry configured)
- [ ] Test all major features manually
- [ ] Check API response times (Network tab)

### Short-term (1-24 hours)
- [ ] Monitor database connection stability
- [ ] Watch for memory leaks
- [ ] Track API response times
- [ ] Monitor user reports
- [ ] Check uptime (UptimeRobot or similar)

### Ongoing
- [ ] Review logs weekly
- [ ] Monitor performance metrics
- [ ] Check database usage
- [ ] Update dependencies monthly
- [ ] Run security checks

---

## 🔄 Maintenance Schedule

### Daily
- Check logs for errors
- Monitor uptime status
- Review critical alerts

### Weekly
- Review API response times
- Check database performance
- Update dependencies if patches available
- Verify backups (MongoDB backup if available)

### Monthly
- Security audit
- Dependency updates (npm audit)
- Review and cleanup logs
- Test disaster recovery

### Quarterly
- Load testing
- Security penetration testing
- Performance optimization
- Review architecture

---

## 🚨 Rollback Procedures

### If Backend Deployment Fails
```bash
# Option 1: Render Dashboard
1. Go to Deployments
2. Click on previous successful deployment
3. Click "Redeploy"

# Option 2: Git revert
git revert HEAD
git push origin main
# Render auto-redeploys
```

### If Frontend Deployment Fails
```bash
# Vercel Dashboard
1. Go to Deployments
2. Click on previous successful deployment
3. Click "Redeploy"
```

### If Database Connection Lost
1. Check MongoDB Atlas status
2. Verify IP whitelist in MongoDB Atlas
3. Check credentials in Render environment variables
4. Test connection from MongoDB Compass

---

## 📞 Support & Contacts

### Render Support
- Dashboard: https://dashboard.render.com
- Docs: https://render.com/docs
- Status Page: https://status.render.com

### Vercel Support
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Status Page: https://vercel.statuspage.io

### MongoDB Support
- Dashboard: https://cloud.mongodb.com
- Docs: https://docs.mongodb.com
- Support: https://support.mongodb.com

---

## ✅ Final Verification

Before marking deployment as complete:

- [ ] Frontend loads without errors
- [ ] Login works with demo credentials
- [ ] Dashboard displays data
- [ ] Assets page shows no CORS errors
- [ ] Transactions can be created
- [ ] API calls appear in Network tab
- [ ] No console errors in DevTools
- [ ] Response times are acceptable (<1s)
- [ ] Health check endpoint responds
- [ ] Backend logs show successful requests
- [ ] MongoDB queries complete successfully
- [ ] No memory warnings in logs

---

## 📈 Performance Targets

| Metric | Target | Alert |
|--------|--------|-------|
| API Response Time | <500ms | >1000ms |
| Backend Uptime | 99.5% | <99% |
| Frontend Page Load | <2s | >5s |
| Database Query Time | <100ms | >500ms |
| Error Rate | <0.1% | >1% |

---

## 🎓 Learning Resources

- [Render Production Checklist](https://render.com/docs/best-practices)
- [Vercel Best Practices](https://vercel.com/docs/best-practices)
- [MongoDB Atlas Security](https://docs.atlas.mongodb.com/security/)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

---

**Last Updated: April 2026**  
**Status: ✅ Ready for Production**
