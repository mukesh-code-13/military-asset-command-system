# 🔥 Military Asset Command System

**Enterprise-grade logistics intelligence platform for real-time military asset management and operational visibility**

---

## 🧠 Problem Statement

Military logistics operations face critical challenges that directly impact operational readiness:

- **Visibility Gap**: Fragmented, manual tracking systems fail to provide real-time asset location and status across multiple bases and forward operating locations
- **Inefficient Transfers**: Moving weapons, vehicles, ammunition between bases takes days instead of hours—no centralized coordination
- **Expenditure Blind Spots**: No clear audit trail for asset consumption, leading to unexpected shortages and wasteful usage
- **Decision Delays**: Manual reporting and spreadsheet-based analysis delay critical supply chain decisions by hours or days
- **Compliance & Accountability**: Inability to track who accessed what, when, and why—creating audit and accountability gaps

These bottlenecks cost time, resources, and operational effectiveness.

---

## ⚡ Solution

**Military Asset Command System** is an **integrated, real-time logistics intelligence platform** designed for command-and-control of military assets. It provides:

✅ **Real-Time Visibility** – Know exactly where every asset is, its status, and availability across all locations  
✅ **Centralized Control** – Manage transfers, assignments, and expenditures from a single dashboard  
✅ **Decision Intelligence** – Automated analytics, inventory forecasting, and supply chain insights  
✅ **Role-Based Operations** – Different views and permissions for Commanders, Logistics Officers, and Administrators  
✅ **Audit & Compliance** – Complete transaction history with full traceability and accountability  
✅ **Enterprise-Ready** – Built for scale, security, and 24/7 operational reliability

---

## 🚀 Features

### 📦 Asset Management
- **Centralized Inventory**: Track vehicles, weapons systems, ammunition, equipment, and supplies
- **Asset Details**: Maintain condition status, procurement date, maintenance history
- **Location Tracking**: Real-time base and unit assignments
- **Available & Assigned State**: Know what's available for deployment vs. in-use

### 🔄 Transfer Management
- **Base-to-Base Transfers**: Request, approve, and execute asset transfers between locations
- **Status Tracking**: Monitor transfer status from request to receipt
- **Chain of Custody**: Document handoff and verification at each stage
- **Transfer History**: Complete audit log of all movements

### 🎯 Assignment & Expenditure
- **Asset Assignments**: Assign weapons, vehicles, and equipment to units and personnel
- **Expenditure Tracking**: Log consumption and depletion of consumables
- **Reclaim & Return**: Track assets returned to inventory
- **Usage Metrics**: Understand operational consumption patterns

### 👥 Role-Based Access Control (RBAC)
- **Administrator**: System setup, user management, audit oversight, full permissions
- **Commander**: View all assets and transfers, approve high-level requisitions, strategic reporting
- **Logistics Officer**: Execute transfers, manage inventory, process assignments, handle daily operations

### 📊 Intelligent Dashboard
- **KPI Overview**: Real-time inventory counts, asset utilization rates, transfer status
- **Supply Health Indicators**: Identify low-stock items and critical shortages
- **Operational Analytics**: Asset usage patterns, transfer efficiency metrics
- **Predictive Insights**: AI-powered forecasts for anticipated shortages (Premium feature)

### 📜 Transaction History & Audit Logs
- **Complete Traceability**: Every action logged with timestamp and user attribution
- **Compliance Reports**: Export full transaction history for audits and inspections
- **Change Tracking**: Who modified what, when, and why
- **Integrity Verification**: Ensure accountability across entire supply chain

### 🔮 Predictive Insights (Roadmap)
- **Shortage Forecasting**: ML-based predictions for upcoming supply gaps
- **Consumption Analysis**: Seasonal and temporal usage pattern detection
- **Recommendations**: Smart suggestions for rebalancing inventory

---

## 🏗️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React.js, Redux, Tailwind CSS, React Router |
| **Backend** | Node.js, Express.js, Authentication (JWT) |
| **Database** | MongoDB with indexed queries for performance |
| **API** | RESTful architecture, JSON payloads |
| **Deployment** | Containerized with Docker, cloud-ready |

---

## 🧩 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                        │
│                   React Single-Page App                      │
│        (Dashboard, Asset Management, Transfers UI)           │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/REST API
                    (JWT Auth Token)
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   BACKEND (Node.js)                          │
│           Express.js API Server & Auth Service              │
│  ├─ Assets Controller (CRUD, tracking)                      │
│  ├─ Transactions Controller (transfers, assignments)        │
│  ├─ Users Controller (role management)                      │
│  ├─ Dashboard Controller (analytics)                        │
│  └─ Middleware (Authentication, Authorization, Logging)    │
└────────────────────────┬────────────────────────────────────┘
                         │
                      Queries & Indexing
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  DATA LAYER (MongoDB)                        │
│  ├─ Assets Collection (vehicles, weapons, supplies)         │
│  ├─ Transactions Collection (ledger of all operations)      │
│  ├─ Users Collection (personnel & role bindings)            │
│  └─ Audit Logs (immutable transaction history)              │
└─────────────────────────────────────────────────────────────┘
```

**Flow**: User interacts with React UI → sends API request with auth token → Backend validates permissions → queries/updates MongoDB → returns data to UI

---

## 📊 Core Data Models

### Assets
```json
{
  "id": "ASS-001",
  "type": "Vehicle",  // Vehicle, Weapon, Ammunition, Equipment
  "name": "M1 Abrams Tank",
  "serialNumber": "ABC123456",
  "status": "Operational",  // Operational, Maintenance, Retired
  "currentLocation": "Fort Bragg",
  "currentAssignee": "Bravo Company",
  "acquisitionDate": "2023-01-15",
  "quantity": 1,  // for consumables
  "condition": "Excellent"
}
```

### Transactions
```json
{
  "id": "TXN-001",
  "type": "Transfer",  // Transfer, Assignment, Expenditure, Reclaim
  "assetId": "ASS-001",
  "fromBase": "Fort Bragg",
  "toBase": "Fort Jackson",
  "requestedBy": "user123",
  "approvedBy": "admin001",
  "status": "Completed",  // Requested, Approved, In Transit, Completed
  "timestamp": "2024-04-15T10:30:00Z",
  "notes": "Equipment rotation"
}
```

### Users
```json
{
  "id": "user123",
  "name": "Captain James Mitchell",
  "email": "j.mitchell@military.mil",
  "role": "Commander",  // Administrator, Commander, LogisticsOfficer
  "assignedBase": "Fort Bragg",
  "permissions": ["view_assets", "approve_transfers", "view_dashboard"],
  "lastLogin": "2024-04-15T09:00:00Z"
}
```

---

## 🔐 Role-Based Access Control

| Feature | Admin | Commander | Logistics Officer |
|---------|-------|-----------|------------------|
| View All Assets | ✅ | ✅ | ✅ |
| Transfer Assets | ✅ | Approve Only | ✅ |
| Assign Assets | ✅ | ✅ | ✅ |
| Record Expenditure | ✅ | ✅ | ✅ |
| Manage Users | ✅ | ❌ | ❌ |
| View Audit Logs | ✅ | ✅ | ❌ |
| Approve Transfers | ✅ | ✅ | ❌ |
| Access Dashboard | ✅ | ✅ | ✅ |
| Export Reports | ✅ | ✅ | ❌ |

---

## 🔌 API Endpoints

### Assets
```
GET    /api/assets                    # List all assets with filters
GET    /api/assets/:assetId           # Get asset details
POST   /api/assets                    # Create new asset
PUT    /api/assets/:assetId           # Update asset
DELETE /api/assets/:assetId           # Decommission asset
GET    /api/assets/by-location/:base  # Get assets at specific base
```

### Transactions
```
GET    /api/transactions              # List transactions (filterable by type, status)
POST   /api/transactions              # Create new transaction (transfer/assignment)
GET    /api/transactions/:txnId       # Get transaction details
PUT    /api/transactions/:txnId       # Update transaction status
GET    /api/transactions/asset/:assetId  # Get history for specific asset
```

### Dashboard & Analytics
```
GET    /api/dashboard                 # Main dashboard metrics & KPIs
GET    /api/inventory/:base           # Base-level inventory status
GET    /api/analytics/utilization     # Asset utilization reports
GET    /api/analytics/predictions     # Shortage forecasting (Premium)
```

### Users & Authentication
```
POST   /api/auth/login                # User login, returns JWT
POST   /api/auth/logout               # Logout & invalidate session
GET    /api/users                     # List users (Admin only)
POST   /api/users                     # Create user (Admin only)
PUT    /api/users/:userId             # Update user profile
```

---

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js** v16 or higher
- **MongoDB** (local or Atlas cloud instance)
- **npm** or **yarn**
- **Git**

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/military-asset-command-system.git
cd military-asset-command-system

# 2. Navigate to backend directory
cd backend

# 3. Install dependencies
npm install

# 4. Create .env file with configuration
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/militaryassets
JWT_SECRET=your-secret-key-here
NODE_ENV=development
EOF

# 5. Start the backend server
npm run dev
# Backend runs on http://localhost:5000
```

### Frontend Setup

```bash
# 1. Navigate to frontend directory (from project root)
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file with API endpoint
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF

# 4. Start the frontend development server
npm start
# Frontend runs on http://localhost:3000
```

### Database Setup (MongoDB)

```bash
# Option A: Use MongoDB Atlas (Recommended for production)
# 1. Create account at https://www.mongodb.com/cloud/atlas
# 2. Create cluster and get connection string
# 3. Add connection string to backend .env file

# Option B: Local MongoDB
# 1. Install MongoDB locally
# 2. Start MongoDB service: mongod
# 3. Update MONGODB_URI in .env: mongodb://localhost:27017/militaryassets
```

### Verify Installation

```bash
# Backend should return status
curl http://localhost:5000/health

# Frontend should load
open http://localhost:3000
```

---

## 🌍 Deployment

### Backend Deployment (Render)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect to Render
# - Go to https://render.com
# - Create new "Web Service"
# - Connect GitHub repository
# - Configure environment variables (from .env)
# - Deploy

# Backend will be available at:
# https://your-app-name.onrender.com/api
```

### Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy from project root
cd frontend
vercel

# 3. Configure environment variables in Vercel dashboard
# REACT_APP_API_URL=https://your-backend.onrender.com/api

# Frontend will be available at:
# https://your-app-name.vercel.app
```

### Docker Containerization (Optional)

```bash
# Build Docker image
docker build -t military-asset-system:latest .

# Run container
docker run -p 5000:5000 -e MONGODB_URI=<uri> military-asset-system:latest
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Administrator** | admin@military.mil | AdminPass123! | Full system access, user management |
| **Commander** | commander@military.mil | CmdPass123! | View all assets, approve transfers |
| **Logistics Officer** | logistics@military.mil | LogPass123! | Execute transfers, manage inventory |

**Demo Environment**: https://military-asset-demo.vercel.app

---

## 🎥 Demo & Documentation

### Video Walkthrough
- **Feature Overview**: [Watch Demo](https://youtu.be/example)
- **Dashboard Tutorial**: [View Guide](https://youtu.be/example)
- **Transfer Process**: [Step-by-Step](https://youtu.be/example)

### Screenshots
- Dashboard with KPIs and analytics
- Asset management interface
- Transfer request workflow
- Role-based user view
- Audit log visualization

---

## 📌 Future Enhancements

### Phase 2: Intelligence & Automation
- 🤖 **Predictive Analytics**: ML models for shortage forecasting and consumption prediction
- 🔔 **Real-Time Notifications**: Push alerts for critical low-stock conditions and transfer delays
- 📍 **Map-Based Visualization**: Interactive maps showing asset locations and base inventories
- ⚡ **Mobile App**: iOS/Android native apps for field operations

### Phase 3: Advanced Features
- 🛰️ **GPS Integration**: Real-time tracking for mobile assets (vehicles, equipment)
- 📱 **IoT Sensor Integration**: Automatic asset status updates via smart sensors
- 🔗 **Blockchain Audit Trail**: Immutable transaction records for maximum compliance
- 🌐 **Multi-Theater Support**: Manage operations across multiple geographic regions

### Phase 4: Enterprise
- 🏢 **Multi-Base Federation**: Unified command across entire military branch
- 💬 **AI-Powered Assistant**: Natural language queries for asset intelligence
- 📊 **Advanced Reporting**: Custom report builder and scheduled exports
- 🔌 **API Partners**: Integration with third-party logistics systems

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👥 Support & Contributing

### Reporting Issues
Found a bug? [Open an issue](https://github.com/yourusername/military-asset-command-system/issues) with:
- Description of the problem
- Steps to reproduce
- Expected vs. actual behavior

### Contributing
Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📧 Contact & Support

- **Project Lead**: [Your Name] - [your.email@military.mil]
- **Technical Support**: [support@militaryasset.com](mailto:support@militaryasset.com)
- **Documentation**: [Full Docs](https://docs.example.com)

---

**Built with ❤️ for operational excellence and mission readiness**

*Last Updated: April 2026*
