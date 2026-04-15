# DevOps & Infrastructure Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────┐
│        Vercel CDN (Frontend)            │
│   military-asset-frontend.vercel.app    │
│   - Auto-scaling                        │
│   - Global edge locations               │
│   - DDoS protection included            │
└─────────────────────────────────────────┘
                    ↓ HTTPS
┌─────────────────────────────────────────┐
│       Render (Backend + Database)       │
│   military-asset-backend.onrender.com   │
│   - Node.js/Express server              │
│   - MongoDB Atlas integration           │
│   - Auto-restarts on failure            │
└─────────────────────────────────────────┘
                    ↓ TLS
┌─────────────────────────────────────────┐
│        MongoDB Atlas (Database)         │
│        cloud.mongodb.com                │
│   - Cluster with sharding               │
│   - Automatic backups (35-day retention)│
│   - Point-in-time recovery              │
└─────────────────────────────────────────┘
```

---

## 🐳 Docker & Local Development

### Docker Compose Services

**mongodb:latest**
- Port: 27017 (internal: 27017)
- Volume: `mongo_data:/data/db`
- Network: `macs-network`
- Initialization: Creates `militaryassets` database

**backend:latest**
- Port: 5000
- Depends on: mongodb
- Volume: `./ backend:/app` (hot reload)
- Environment: Development settings

**frontend:latest**
- Port: 3000
- Depends on: backend
- Interactive mode: stdin_open + tty (for debugging)

### Running Locally

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Stop and remove data
docker-compose down -v
```

### Container Management

```bash
# List running containers
docker ps

# View container logs
docker logs <container-id>

# Execute command in container
docker exec -it <container-id> npm list

# Rebuild containers
docker-compose build --no-cache

# Access container shell
docker exec -it <container-id> /bin/sh
```

---

## 🚀 Render Deployment

### Infrastructure Setup

**Web Service**
- Runtime: Node.js v18
- Plan: Free (512MB RAM, 0.5 CPU)
- Auto-scaling: Disabled (free tier)
- Region: Singapore/Tokyo (closest to Asia)

**Health Checks**
- Endpoint: `/health`
- Interval: 15 seconds
- Conditions:
  - HTTP 200-299: Healthy
  - Others: Unhealthy
  - Auto-restart after 3 consecutive failures

**Auto-Deploy**
- Trigger: GitHub push to `main` branch
- Duration: ~2-3 minutes
- Logs visible in Render dashboard

### Maintenance

```bash
# Redeploy manually
1. Render Dashboard → Deployments
2. Click "Deploy latest commit"

# View logs
Render Dashboard → Logs (realtime streaming)

# Environment variables
Settings → Environment Variables → Edit
```

### Performance Tuning

```javascript
// backend/server.js - Add compression (future enhancement)
import compression from 'compression';
app.use(compression());
```

### Cost Optimization

- Free tier: $0/month
- Includes: 400 compute hours/month
- Upgrade triggers: When exceeding free tier limits
- Estimate: $17-25/month for production load

---

## 🎨 Vercel Frontend Deployment

### Infrastructure Setup

**Build & Deploy**
- Framework: Create React App
- Build Command: `npm run build`
- Output Directory: `build/`
- Install Command: `npm install`

**Optimization Features**
- Image optimization
- Code splitting
- Minification
- Gzip compression
- AWS CloudFront CDN

**Deployment Regions**
- Default: DFW (Dallas), SFO (San Francisco)
- Configurable by geography

### Maintenance

```bash
# Redeploy
1. Vercel Dashboard → Deployments
2. Click "Redeploy"

# Environment variables
Settings → Environment Variables

# Monitor builds
Deployments → Click build → View logs
```

### Performance Metrics

Vercel provides:
- Web Vitals (LCP, FID, CLS)
- Analytics dashboard
- Performance insights
- Real User Monitoring (RUM)

---

## 📊 Monitoring & Logging

### Backend Logging

**Console Output (Render Logs)**
```
Access: Render Dashboard → Logs
Auto-capture: Startup, requests, errors
Format: console.log() output
Retention: 2 weeks per Render
```

**Structured Logging (Future Enhancement)**
```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Frontend Monitoring

**Console Errors (Network Tab)**
- DevTools → Network tab (after login)
- DevTools → Console tab (errors/warnings)
- Vercel Analytics → Performance

**Error Tracking (Future)**
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Performance Monitoring

**Render**
```
CPU Usage: Monitor in Render dashboard
Memory Usage: Should stay <300MB (free tier)
Request Rate: Watch for spikes
Response Times: Target <500ms
```

**Vercel**
```
Build Times: Should be <60 seconds
Bundle Size: Keep <500KB
Page Load: Target <2 seconds
Core Web Vitals: Track in analytics
```

---

## 🔒 Security Best Practices

### Network Security

- ✅ HTTPS/TLS enabled (automatic)
- ✅ CORS configured for frontend URL only
- ✅ Environment variables encrypted at rest
- ✅ JWT token-based authentication
- ☐ Rate limiting (not implemented)
- ☐ API key rotation (future)

### Data Security

```bash
# MongoDB Security
- Authentication: Username/password required
- Network: IP whitelist (allow specific IPs)
- Encryption: TLS for in-transit, encryption at-rest (paid)
- Backups: Automatic daily (35-day retention)
- Point-in-time recovery: Available

# Database Access
- Render: Uses secure connection string
- Restricted: Only Render IP allowed
- Credentials: Stored in Render environment variables
```

### Secrets Management

```bash
# ✅ Do NOT commit secrets
git status | grep -i ".env"  # Should NOT show .env

# Store in Render/Vercel dashboards
Environment Variables → Add encrypted variables

# Rotate regularly
openssl rand -base64 32  # Generate new secret
Update RENDER dashboard
Service auto-restarts with new secret
```

### Access Control

```javascript
// RBAC implemented
- Administrator: Full access
- Commander: Read + approve
- Logistics Officer: Execute transfers

// JWT verification on every route
authenticate middleware checks token validity
authorize middleware checks user role
```

---

## 📈 Scaling Considerations

In the free tier, the system handles:
- ~100 concurrent users
- ~1000 requests/hour
- ~10MB data storage

### Scaling Path

**Stage 1: Optimize Current Setup** ($0-25/month)
- Add Redis caching (Render)
- Optimize database indexes
- Implement request batching

**Stage 2: Vertical Scaling** ($25-50/month)
- Upgrade Render plan (2GB → 4GB RAM)
- Database cluster with sharding
- CDN optimization

**Stage 3: Horizontal Scaling** ($50-200+/month)
- Auto-scaling with load balancer
- Database replica set (high availability)
- Separate read/write nodes
- Message queue for async tasks

---

## 🛠️ DevOps Tools & Scripts

### Validation Scripts

```bash
# Validate deployment setup
./validate-deployment.sh

# Run all checks
./validate-deployment.sh 2>&1 | tee validation-report.txt
```

### Health Check

```bash
# Check all services
./health-check.sh

# Custom endpoint testing
BACKEND_URL=https://your-backend.onrender.com \
FRONTEND_URL=https://your-frontend.vercel.app \
./health-check.sh
```

### Environment Setup

```bash
# Setup .env files
./setup-env.sh
```

---

## 🆘 Troubleshooting

### Backend Issues

**Service won't start**
```
1. Check Render logs
2. Verify MONGODB_URI is correct
3. Ensure DATABASE exists in MongoDB Atlas
4. Check JWT_SECRET length (min 32 chars)
5. Redeploy with: Render Dashboard → Redeploy
```

**Slow requests**
```
1. Check database response times
2. Look for N+1 queries (fix in code)
3. Add indexes to frequently queried fields
4. Consider database sharding
```

**Memory issues**
```
1. Upgrade Render plan
2. Check for memory leaks (logs)
3. Implement caching layer
4. Optimize database queries
```

### Frontend Issues

**Build failures**
```
1. Check Vercel build logs
2. Verify all npm packages installed
3. Check for TypeScript errors
4. Ensure .env file has REACT_APP_API_URL
```

**CORS errors**
```
1. Backend CORS_ORIGIN must match frontend URL
2. Update CORS in Render environment variables
3. Redeploy backend to apply changes
4. Check Network tab for actual request URL
```

**Performance issues**
```
1. Check bundle size: npm run build
2. Look for large dependencies
3. Implement code splitting
4. Use React.lazy() for routes
```

---

## 📋 Disaster Recovery

### Backup Strategy

**Database**
- Frequency: Automatic daily (MongoDB Atlas)
- Retention: 35 days
- Recovery: Can restore to any point in time
- Location: Multi-region

**Code**
- Primary: GitHub repository
- Frequency: Every commit
- Recovery: Clone and redeploy

### Recovery Procedures

**Restore from backup**
```
1. MongoDB Atlas Dashboard
2. Collections → Backup → Restore
3. Choose snapshot date/time
4. Confirm restoration
5. Verify data integrity
```

**Rollback deployment**
```
# Backend
Render Dashboard → Deployments → Click previous → Redeploy

# Frontend
Vercel Dashboard → Deployments → Click previous → Promote
```

---

## 📚 Infrastructure Monitoring Checklist

### Daily
- [ ] Check Render logs for errors
- [ ] Monitor uptime status
- [ ] Review critical alerts

### Weekly
- [ ] Check API response times
- [ ] Monitor database size
- [ ] Review error trends
- [ ] Check security logs

### Monthly
- [ ] Full security audit
- [ ] Performance review
- [ ] Cost analysis
- [ ] Backup verification
- [ ] Update dependencies

---

## 🔗 External Resources

### Render Documentation
- https://render.com/docs
- Health Checks: https://render.com/docs/health-checks
- Environment Variables: https://render.com/docs/environment-variables

### Vercel Documentation
- https://vercel.com/docs
- Deployment: https://vercel.com/docs/deployments/overview
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables

### MongoDB Atlas
- https://docs.atlas.mongodb.com/
- Backup/Restore: https://docs.atlas.mongodb.com/backup/
- Performance: https://docs.atlas.mongodb.com/performance-advisor/

---

**Last Updated: April 2026**  
**Infrastructure Status: ✅ Production Ready**
