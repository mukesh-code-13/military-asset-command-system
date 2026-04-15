# Military Asset Command System - Complete Project Structure

## 📁 Directory Structure

```
military-asset-command-system/
├── backend/                          # Node.js/Express backend
│   ├── config/
│   │   └── database.js               # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication
│   │   └── errorHandler.js           # Error handling middleware
│   ├── models/
│   │   ├── Asset.js                  # Asset schema
│   │   ├── Transaction.js            # Transaction schema
│   │   └── User.js                   # User schema with bcrypt
│   ├── routes/
│   │   ├── auth.js                   # Auth endpoints (login/register)
│   │   ├── assets.js                 # Asset management endpoints
│   │   ├── transactions.js           # Transaction endpoints
│   │   ├── dashboard.js              # Analytics endpoints
│   │   └── users.js                  # User management endpoints
│   ├── server.js                     # Main Express server
│   ├── package.json                  # Backend dependencies
│   ├── .env.example                  # Environment variables template
│   ├── Dockerfile                    # Docker configuration
│   └── render.yaml                   # Render deployment config
│
├── frontend/                         # React frontend
│   ├── public/
│   │   └── index.html                # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js             # Top navigation bar
│   │   │   └── Sidebar.js            # Left sidebar navigation
│   │   ├── pages/
│   │   │   ├── Login.js              # Login page with demo credentials
│   │   │   ├── Dashboard.js          # Main dashboard with analytics
│   │   │   ├── Assets.js             # Asset management page
│   │   │   ├── Transactions.js       # Transactions list page
│   │   │   ├── Users.js              # User management (Admin only)
│   │   │   └── Profile.js            # User profile page
│   │   ├── api.js                    # Axios API client with interceptors
│   │   ├── App.js                    # Main app component with routing
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles with Tailwind
│   ├── package.json                  # Frontend dependencies
│   ├── .env.example                  # Environment variables template
│   ├── Dockerfile                    # Multi-stage Docker build
│   ├── vercel.json                   # Vercel deployment config
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── postcss.config.js             # PostCSS configuration
│
├── docker-compose.yml                # Local development with Docker
├── SETUP.md                          # Setup and deployment guide
├── README.md                         # Project overview (professional)
└── LICENSE                           # MIT License
```

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│  ├─ Login Page (Auth)                                       │
│  ├─ Dashboard (Analytics & Metrics)                         │
│  ├─ Assets Manager (CRUD)                                   │
│  ├─ Transactions (Transfer, Assignment, Expenditure)        │
│  ├─ Users (Admin Role Management)                           │
│  └─ Profile (User Profile & Settings)                       │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API (JWT Auth)
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    BACKEND (Node.js)                         │
│  ├─ Auth Service (JWT, Login, Register)                     │
│  ├─ Asset Service (CRUD, Location Tracking)                 │
│  ├─ Transaction Service (Transfers, Assignments)            │
│  ├─ Dashboard Service (Analytics, Predictions)              │
│  └─ User Service (Management, Permissions)                  │
└────────────────────────┬────────────────────────────────────┘
                         │ MongoDB Queries
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   DATABASE (MongoDB)                         │
│  ├─ Assets Collection                                        │
│  ├─ Transactions Collection                                  │
│  ├─ Users Collection                                         │
│  └─ Audit Logs (Immutable)                                   │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Models

### Asset Model
- `assetId`: Unique identifier
- `type`: Vehicle, Weapon, Ammunition, Equipment, Supply
- `name`: Asset name
- `serialNumber`: Unique serial
- `status`: Operational, Maintenance, Retired, In Transit
- `currentLocation`: Current base
- `currentAssignee`: Unit/Person assigned
- `acquisitionDate`: Purchase date
- `quantity`: Number of units
- `condition`: Excellent, Good, Fair, Poor
- `maintenanceHistory`: Array of maintenance records

### Transaction Model
- `transactionId`: Unique identifier
- `type`: Transfer, Assignment, Expenditure, Reclaim, Purchase
- `assetId`: Reference to asset
- `fromBase`: Origin location
- `toBase`: Destination location
- `quantity`: Units involved
- `requestedBy`: User who created request
- `approvedBy`: User who approved
- `status`: Requested, Approved, In Transit, Completed, Rejected
- `timestamp`: Creation date
- `completedDate`: Completion date
- `priority`: Low, Medium, High, Critical

### User Model
- `userId`: Unique identifier
- `name`: Full name
- `email`: Email address (unique)
- `password`: Hashed password (bcrypt)
- `role`: Administrator, Commander, LogisticsOfficer
- `assignedBase`: Home base
- `permissions`: Array of permissions
- `status`: Active, Inactive, Suspended
- `lastLogin`: Last login timestamp

## 🔐 Authentication Flow

1. User logs in with email/password
2. Backend validates credentials against Users collection
3. JWT token generated with user info and role
4. Token stored in localStorage on frontend
5. Token sent with all API requests in Authorization header
6. Backend middleware verifies token on each request
7. User role determines access permissions

## 🚀 Deployment Paths

### Backend → Render
- Free tier available
- Auto-deploys from GitHub
- MongoDB connection via environment variables
- Includes database configuration in render.yaml

### Frontend → Vercel
- Free tier available
- Auto-deploys from GitHub
- Environment variables configured in dashboard
- Automatic optimizations and edge caching

## 📦 Key Dependencies

### Backend
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `cors`: Cross-origin support
- `dotenv`: Environment variables

### Frontend
- `react`: UI library
- `react-router-dom`: Client-side routing
- `axios`: HTTP client
- `tailwindcss`: CSS framework
- `recharts`: Charts and graphs
- `lucide-react`: Icon library

## 🔑 Features Implemented

✅ Role-Based Access Control (RBAC)
✅ Asset Management (CRUD)
✅ Transfer Management
✅ Transaction Tracking
✅ Real-time Dashboard
✅ User Authentication (JWT)
✅ Password Hashing (bcrypt)
✅ Error Handling
✅ API Error Handling
✅ Responsive Design (Tailwind CSS)
✅ Docker Support
✅ Render Deployment Ready
✅ Vercel Deployment Ready

## 🧪 Testing Credentials

### Demo Users (Pre-populated in code)
- Admin: admin@military.mil / AdminPass123!
- Commander: commander@military.mil / CmdPass123!
- Logistics Officer: logistics@military.mil / LogPass123!

## 📋 Todo/Future Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] Email notifications
- [ ] Real-time WebSocket updates
- [ ] Map-based asset visualization
- [ ] Mobile app (React Native)
- [ ] Advanced analytics with ML predictions
- [ ] Blockchain audit trail
- [ ] API rate limiting
- [ ] Comprehensive test suite
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Database backups automation
- [ ] Monitoring and logging (Sentry)

---

For setup instructions, see [SETUP.md](SETUP.md)
For project overview, see [README.md](README.md)
