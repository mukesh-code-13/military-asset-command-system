#!/bin/bash
# Deployment Validation Script
# Run this to verify your deployment is working correctly

set -e

echo "🔍 Starting Deployment Validation..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
PASSED=0
FAILED=0

# Helper functions
pass() {
    echo -e "${GREEN}✅${NC} $1"
    ((PASSED++))
}

fail() {
    echo -e "${RED}❌${NC} $1"
    ((FAILED++))
}

warn() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

echo "📋 BACKEND VALIDATION"
echo "===================="

# Check if backend directory exists
if [ -d "backend" ]; then
    pass "Backend directory exists"
else
    fail "Backend directory not found"
    exit 1
fi

# Check package.json
if [ -f "backend/package.json" ]; then
    pass "Backend package.json exists"
else
    fail "Backend package.json not found"
fi

# Check required files
files_to_check=(
    "backend/server.js"
    "backend/config/database.js"
    "backend/middleware/auth.js"
    "backend/Dockerfile"
    "backend/render.yaml"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        pass "$file exists"
    else
        fail "$file missing"
    fi
done

# Check .env.example
if [ -f "backend/.env.example" ]; then
    pass "Backend .env.example exists"
    if grep -q "MONGODB_URI" "backend/.env.example"; then
        pass "MONGODB_URI in .env.example"
    else
        fail "MONGODB_URI missing from .env.example"
    fi
else
    warn "backend/.env.example not found - create from template"
fi

echo ""
echo "📋 FRONTEND VALIDATION"
echo "===================="

# Check frontend directory
if [ -d "frontend" ]; then
    pass "Frontend directory exists"
else
    fail "Frontend directory not found"
    exit 1
fi

# Check frontend package.json
if [ -f "frontend/package.json" ]; then
    pass "Frontend package.json exists"
    if grep -q "react" "frontend/package.json"; then
        pass "React dependency found"
    else
        fail "React dependency not found"
    fi
else
    fail "Frontend package.json not found"
fi

# Check required frontend files
frontend_files=(
    "frontend/src/App.js"
    "frontend/src/api.js"
    "frontend/public/index.html"
    "frontend/Dockerfile"
    "frontend/vercel.json"
    "frontend/tailwind.config.js"
)

for file in "${frontend_files[@]}"; do
    if [ -f "$file" ]; then
        pass "$file exists"
    else
        fail "$file missing"
    fi
done

echo ""
echo "📋 DOCKER VALIDATION"
echo "===================="

# Check docker-compose.yml
if [ -f "docker-compose.yml" ]; then
    pass "docker-compose.yml exists"
    
    # Check for services
    if grep -q "mongodb:" "docker-compose.yml"; then
        pass "MongoDB service configured"
    else
        fail "MongoDB service not found"
    fi
    
    if grep -q "backend:" "docker-compose.yml"; then
        pass "Backend service configured"
    else
        fail "Backend service not found"
    fi
    
    if grep -q "frontend:" "docker-compose.yml"; then
        pass "Frontend service configured"
    else
        fail "Frontend service not found"
    fi
else
    fail "docker-compose.yml not found"
fi

echo ""
echo "📋 DOCUMENTATION VALIDATION"
echo "=========================="

docs=(
    "README.md"
    "SETUP.md"
    "DEPLOYMENT.md"
    "ARCHITECTURE.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        pass "$doc exists"
    else
        fail "$doc missing"
    fi
done

echo ""
echo "📋 RENDER CONFIGURATION VALIDATION"
echo "=================================="

if [ -f "backend/render.yaml" ]; then
    pass "render.yaml exists"
    
    # Check key configurations
    if grep -q "NODE_ENV" "backend/render.yaml"; then
        pass "NODE_ENV configured"
    else
        warn "NODE_ENV not explicitly configured"
    fi
    
    if grep -q "healthCheckPath" "backend/render.yaml"; then
        pass "Health check configured"
    else
        warn "Health check not configured"
    fi
else
    fail "render.yaml not found"
fi

echo ""
echo "📋 VERCEL CONFIGURATION VALIDATION"
echo "================================="

if [ -f "frontend/vercel.json" ]; then
    pass "vercel.json exists"
    
    if grep -q "buildCommand" "frontend/vercel.json"; then
        pass "Build command configured"
    else
        warn "Build command not explicitly configured"
    fi
else
    fail "frontend/vercel.json not found"
fi

echo ""
echo "📊 SUMMARY"
echo "=========="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 All validations passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Create .env files from .env.example templates"
    echo "2. For local development: docker-compose up"
    echo "3. For production: Deploy with Render and Vercel"
    echo "4. See DEPLOYMENT.md for detailed instructions"
    exit 0
else
    echo ""
    echo -e "${RED}⚠️ Some validations failed. Please fix the issues above.${NC}"
    exit 1
fi
