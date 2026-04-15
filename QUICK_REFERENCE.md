# Quick Reference Guide

## 🚀 Quick Start Commands

### Local Development

```bash
# Install and run everything
cd backend && npm install && npm run dev
# In another terminal:
cd frontend && npm install && npm start
```

### With Docker

```bash
docker-compose up -d
# Access: http://localhost:3000
```

## 🔗 API Endpoints Reference

### Auth
```
POST   /api/auth/login              body: {email, password}
POST   /api/auth/register           body: {name, email, password, role, assignedBase}
```

### Assets
```
GET    /api/assets                  Get all assets
GET    /api/assets/:assetId         Get specific asset
POST   /api/assets                  Create asset (Admin/Commander)
PUT    /api/assets/:assetId         Update asset
DELETE /api/assets/:assetId         Delete asset (Admin only)
GET    /api/assets/by-location/:location  Get assets at location
```

### Transactions
```
GET    /api/transactions            Get all transactions
GET    /api/transactions/:id        Get specific transaction
POST   /api/transactions            Create transaction
PUT    /api/transactions/:id        Update transaction status
GET    /api/transactions/asset/:id  Get asset history
```

### Dashboard
```
GET    /api/dashboard               Get dashboard metrics
GET    /api/dashboard/inventory/:base     Get base inventory
GET    /api/dashboard/analytics/utilization   Get utilization stats
GET    /api/dashboard/analytics/predictions   Get predictions
```

### Users
```
GET    /api/users                   List users (Admin)
GET    /api/users/profile           Get current user profile
PUT    /api/users/profile           Update profile
POST   /api/users/change-password   Change password
POST   /api/users                   Create user (Admin)
PUT    /api/users/:userId           Update user
```

## 🔐 Authentication

All requests (except login/register) need JWT token:
```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

Token is auto-attached by axios interceptor in `frontend/src/api.js`

## 📦 Project Files

### Backend Key Files
- `server.js` - Main server entry point
- `config/database.js` - MongoDB connection
- `middleware/auth.js` - JWT authentication
- `models/*.js` - Database schemas
- `routes/*.js` - API endpoints

### Frontend Key Files
- `App.js` - Main React component
- `api.js` - API client with interceptors
- `pages/*.js` - Page components
- `components/*.js` - Reusable components

## 🛠️ Development Tips

### Adding a new API endpoint

1. Create route in `backend/routes/`:
```javascript
router.get('/new-endpoint', authenticate, async (req, res) => {
  // Implementation
});
```

2. Create corresponding API function in `frontend/src/api.js`:
```javascript
export const newAPI = {
  getEndpoint: () => api.get('/new-endpoint')
};
```

3. Use in React component:
```javascript
import { newAPI } from '../api';
useEffect(() => {
  newAPI.getEndpoint().then(res => { /* handle */ });
}, []);
```

### Checking User Role

In React components:
```javascript
{user?.role === 'Administrator' && (
  <AdminOnlyComponent />
)}
```

In backend routes:
```javascript
router.post('/admin-only', authenticated, authorize(['Administrator']), (req, res) => {
  // Only admins can access
});
```

## 🐛 Debugging

### Backend Logs
```bash
cd backend
npm run dev
# Watch for console.log outputs
```

### Frontend Logs
```bash
cd frontend
npm start
# Open browser DevTools (F12) → Console tab
```

### MongoDB Queries
```bash
# Connect to MongoDB Atlas
mongosh "mongodb+srv://..."

# List databases
show databases

# Select database
use militaryassets

# View collections
show collections

# Find documents
db.assets.find().pretty()
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/militaryassets
JWT_SECRET=your-secret-key-here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚢 Deployment Checklist

- [ ] Push code to GitHub
- [ ] Create Render project for backend
- [ ] Set environment variables on Render
- [ ] Create Vercel project for frontend
- [ ] Set `REACT_APP_API_URL` environment variable
- [ ] Deploy and test
- [ ] Set up custom domains (optional)
- [ ] Enable HTTPS (automatic with Render/Vercel)
- [ ] Monitor logs in dashboards

## 📞 Common Issues & Solutions

### "Cannot connect to MongoDB"
- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### "CORS error when frontend calls backend"
- Backend has CORS middleware: `app.use(cors())`
- Check `REACT_APP_API_URL` in frontend .env
- Verify backend is running on correct port

### "Login not working"
- Ensure backend is running
- Check network tab in DevTools
- Verify credentials match demo users or registered users
- Check JWT_SECRET is same across requests

### "Assets not showing on dashboard"
- Verify assets exist in MongoDB
- Check API response in browser DevTools Network tab
- Ensure user is authenticated

## 📚 Documentation Files

- `README.md` - Project overview and features
- `SETUP.md` - Installation and deployment guide
- `ARCHITECTURE.md` - Project structure and design
- `QUICK_REFERENCE.md` - This file

---

**Need more help?** Check the full README.md or SETUP.md files!
