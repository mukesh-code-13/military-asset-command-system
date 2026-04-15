# Installation & Setup Guide

## Quick Start

### Prerequisites
- Node.js v16+ installed
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/military-asset-command-system.git
cd military-asset-command-system
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# Example:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/militaryassets
# JWT_SECRET=your-secret-key-here-make-it-strong
# PORT=5000

# Start backend server
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
# From project root, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env if needed
# REACT_APP_API_URL=http://localhost:5000/api

# Start frontend development server
npm start
```

Frontend runs on: `http://localhost:3000`

## Login Credentials (Default Demo Users)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@military.mil | AdminPass123! |
| Commander | commander@military.mil | CmdPass123! |
| Logistics Officer | logistics@military.mil | LogPass123! |

## Docker Setup (Optional)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000

# Stop containers
docker-compose down
```

## Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. New → Web Service
4. Connect your GitHub repository
5. Set up environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a secure secret
   - `NODE_ENV`: production
6. Deploy

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import project
4. Set framework to "Create React App"
5. Environment variables:
   - `REACT_APP_API_URL`: Your Render backend URL
6. Deploy

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Assets
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create asset
- `GET /api/assets/:assetId` - Get asset details
- `PUT /api/assets/:assetId` - Update asset
- `DELETE /api/assets/:assetId` - Delete asset

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:transactionId` - Update transaction

### Dashboard
- `GET /api/dashboard` - Get dashboard metrics
- `GET /api/dashboard/inventory/:base` - Get base inventory

---

For more details, see [README.md](../README.md)
