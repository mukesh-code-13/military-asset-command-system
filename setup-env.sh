#!/bin/bash
# Environment Setup Helper
# Creates .env files from templates with validation

set -e

echo "🔧 Environment Setup Helper"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to create env file
setup_env_file() {
    local template=$1
    local target=$2
    local description=$3
    
    echo "Setting up $description..."
    
    if [ -f "$template" ]; then
        if [ -f "$target" ]; then
            echo -e "${YELLOW}⚠️  $target already exists. Skipping...${NC}"
        else
            cp "$template" "$target"
            echo -e "${GREEN}✅ Created $target${NC}"
        fi
    else
        echo -e "${RED}❌ Template $template not found${NC}"
        return 1
    fi
}

# Backend Environment
echo "1️⃣  Backend Environment Setup"
echo "----------------------------"
setup_env_file "backend/.env.example" "backend/.env" "Backend .env"

if [ -f "backend/.env" ]; then
    echo ""
    echo "📝 Edit backend/.env with:"
    echo "   - Your MongoDB Atlas connection string"
    echo "   - A strong JWT_SECRET (use: openssl rand -base64 32)"
    echo ""
    echo "Example:"
    echo "   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/militaryassets"
    echo "   JWT_SECRET=$(openssl rand -base64 32)"
fi

# Frontend Environment  
echo ""
echo "2️⃣  Frontend Environment Setup"
echo "----------------------------"
setup_env_file "frontend/.env.example" "frontend/.env" "Frontend .env"

if [ -f "frontend/.env" ]; then
    echo ""
    echo "📝 Edit frontend/.env with:"
    echo "   - Local: REACT_APP_API_URL=http://localhost:5000/api"
    echo "   - Production: REACT_APP_API_URL=<your-render-backend-url>/api"
fi

echo ""
echo "✅ Environment Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your MongoDB URI and JWT secret"
echo "2. Edit frontend/.env with your API URL"
echo "3. Run: npm install in both directories"
echo "4. Run: docker-compose up -d (for local development)"
