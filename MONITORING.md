# 📊 Monitoring & Maintenance Guide

After your app goes live, keep it healthy with this guide.

---

## 🟢 Daily Monitoring (2 minutes)

### Check Status
```bash
# Backend health
curl https://your-backend.onrender.com/health

# Should return: {"status":"Backend is running",...}
```

### View Logs
```
Render: https://dashboard.render.com → Your service → Logs
Vercel: https://vercel.com/dashboard → Your project → Deployments
```

### Quick Checklist
- [ ] No error in Render logs
- [ ] No error in Vercel logs
- [ ] Login still works
- [ ] Dashboard loads data

---

## 📈 Weekly Monitoring (15 minutes)

### Performance Review
```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-backend.onrender.com/api/assets

# Response time should be <500ms
```

### Database Check
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Check "Metrics" tab
3. Look for:
   - Operations > 100/sec? (Upgrade needed)
   - Storage > 400MB? (Upgrade needed)

### Update Dependencies (Optional)
```bash
cd backend
npm outdated
npm update

cd ../frontend
npm outdated
npm update

# Test locally then push
git push origin main
```

---

## 🚨 Alert Setup (Recommended)

### Free Uptime Monitoring
1. Go to https://uptimerobot.com
2. Create free account
3. Monitor your backend URL
4. Get alerts if down

### Free Error Tracking
1. Sign up: https://sentry.io (free tier)
2. Add to backend:
   ```bash
   npm install @sentry/node
   ```
3. Add to frontend:
   ```bash
   npm install @sentry/react
   ```

---

## 🔄 Deployment Updates

### When You Update Code
```bash
# 1. Make changes locally
# 2. Test with: docker-compose up

# 3. Commit and push
git add .
git commit -m "Update: your changes"
git push origin main

# 4. Auto-deploys to both Render and Vercel!
# 5. Check dashboards for success
```

### Rollback if Needed
```bash
# If deployment breaks:
# Render: Deployments → Click previous → Redeploy
# Vercel: Deployments → Click previous → Promote
```

---

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| API Response | <500ms | Check weekly |
| Page Load | <2s | Check Vercel Analytics |
| Uptime | 99%+ | Monitor with UptimeRobot |
| Error Rate | <0.1% | Monitor with Sentry |

---

## 🔐 Security Checklist

### Monthly
- [ ] Review access logs
- [ ] Check for suspicious activity
- [ ] Update JWT_SECRET if compromised
- [ ] Verify database backups

### Quarterly
- [ ] Run security audit
- [ ] Update all dependencies
- [ ] Review CORS settings
- [ ] Check password security

---

## 💰 Cost Tracking

### Free Tier Limits
```
Render:
- 512MB RAM
- 400 compute hours/month
- 50GB bandwidth/month

Vercel:
- 100GB bandwidth/month
- Unlimited serverless functions

MongoDB:
- 512MB storage
```

### When to Upgrade
- Render RAM exceeded: Upgrade to Pro ($17+/month)
- Bandwidth exceeded: Upgrade Vercel ($20+/month)
- Storage exceeded: Upgrade MongoDB ($57+/month)

---

## 📝 Maintenance Calendar

```
DAILY:
  - Check health endpoint
  - Review critical errors

WEEKLY:
  - Performance review
  - Database size check
  - Update dependencies

MONTHLY:
  - Security audit
  - Backup verification
  - Cost analysis
  - User feedback review

QUARTERLY:
  - Dependency updates
  - Security testing
  - Performance optimization
  - Team training
```

---

## 🆘 Common Issues & Fixes

### App is Slow
```
1. Check Vercel Analytics
2. Look for large images
3. Check API response times
4. Verify database indexes
5. Consider upgrading Render plan
```

### Database Errors
```
1. Check MongoDB Atlas status
2. Verify IP whitelist
3. Check connection string
4. Monitor storage usage
5. Review query performance
```

### High Error Rate
```
1. Check logs in Render
2. Look for pattern in errors
3. Identify recent changes
4. Rollback if needed
5. Update monitoring alerts
```

---

## 📞 Support Resources

| Issue | Solution |
|-------|----------|
| Render down | Check status.render.com |
| Vercel down | Check vercel.statuspage.io |
| MongoDB down | Check status.cloud.mongodb.com |
| Need help | Check documentation in repo |

---

## 🎯 Success Metrics

Your app is healthy when:

✅ Uptime > 99%
✅ Response time < 500ms
✅ Error rate < 0.1%
✅ Zero CORS errors
✅ Database< 80% capacity
✅ Team feedback positive
✅ Cost under budget

---

## 📊 Dashboard Links

Keep these bookmarked:

```
Render: https://dashboard.render.com
Vercel: https://vercel.com/dashboard
MongoDB: https://cloud.mongodb.com
UptimeRobot: https://uptimerobot.com
Sentry: https://sentry.io (if set up)
```

---

## 🔔 Recommended Alerts

**Render**
- Service crashed → Redeploy
- High memory usage → Upgrade
- Redeployment errors → Check logs

**Vercel**  
- Build failed → Check source
- High bandwidth → Review analytics
- Deployment slow → Optimize code

**MongoDB**
- High CPU usage → Add indexes
- Storage near limit → Upgrade
- Query slow → Review analytics

---

## 🎓 Learning Path

After going live, improve your system:

1. **Week 1**: Monitor baseline performance
2. **Week 2**: Set up automated alerts
3. **Week 3**: Implement caching
4. **Week 4**: Add analytics
5. **Month 2**: Plan scaling strategy

---

**Keep your app running smooth! 🚀**

---

*Last Updated: April 2026*
