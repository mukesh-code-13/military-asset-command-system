#!/bin/bash
# Health Check and Monitoring Script
# Tests all endpoints and services

echo "🏥 Health Check & Monitoring"
echo "============================"
echo ""

# Configuration
BACKEND_URL="${BACKEND_URL:-http://localhost:5000}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3000}"
TIMEOUT=5

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Helper function
check_service() {
    local name=$1
    local url=$2
    
    echo -n "Checking $name... "
    
    if timeout $TIMEOUT curl -s "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Online${NC}"
        return 0
    else
        echo -e "${RED}❌ Offline${NC}"
        return 1
    fi
}

# Helper function for API endpoints
check_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local token=$4
    
    echo -n "Testing $name... "
    
    if [ -n "$token" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Authorization: Bearer $token" \
            -H "Content-Type: application/json" \
            "$BACKEND_URL$endpoint" 2>/dev/null)
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            "$BACKEND_URL$endpoint" 2>/dev/null)
    fi
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✅ OK ($http_code)${NC}"
        return 0
    else
        echo -e "${RED}❌ Failed ($http_code)${NC}"
        return 1
    fi
}

echo "📊 Service Health Check"
echo "----------------------"

# Check services
check_service "Backend" "$BACKEND_URL/health"
check_service "Frontend" "$FRONTEND_URL"

echo ""
echo "🔌 API Endpoint Validation"
echo "-------------------------"

# Test without authentication
check_endpoint "Health endpoint" "GET" "/health"

# Test authentication (using demo credentials)
echo ""
echo "🔐 Authentication Test"
echo "---------------------"

echo -n "Testing login endpoint... "
login_response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@military.mil","password":"AdminPass123!"}' \
    "$BACKEND_URL/api/auth/login" 2>/dev/null)

token=$(echo "$login_response" | grep -o '"token":"[^"]*' | cut -d'"' -f4 | head -1)

if [ -n "$token" ]; then
    echo -e "${GREEN}✅ Login successful${NC}"
    
    # Test authenticated endpoints
    echo ""
    echo "🔓 Authenticated Endpoints"
    echo "-------------------------"
    
    check_endpoint "Get Assets" "GET" "/api/assets" "$token"
    check_endpoint "Get Dashboard" "GET" "/api/dashboard" "$token"
    check_endpoint "Get Transactions" "GET" "/api/transactions" "$token"
    check_endpoint "Get Users" "GET" "/api/users" "$token"
else
    echo -e "${RED}❌ Login failed${NC}"
    echo ""
    echo "Debugging info:"
    echo "$login_response"
fi

echo ""
echo "📈 Performance Metrics"
echo "---------------------"

for endpoint in "/health" "/api/assets" "/api/dashboard"; do
    url="$BACKEND_URL$endpoint"
    
    # Calculate response time (without token for simplicity)
    start_time=$(date +%s%N)
    curl -s "$url" > /dev/null 2>&1
    end_time=$(date +%s%N)
    
    response_time=$((($end_time - $start_time) / 1000000))
    
    if [ "$response_time" -lt 500 ]; then
        status="${GREEN}✅ OK${NC}"
    elif [ "$response_time" -lt 1000 ]; then
        status="${YELLOW}⚠️  Slow${NC}"
    else
        status="${RED}❌ Very Slow${NC}"
    fi
    
    echo -e "${endpoint}: ${response_time}ms $status"
done

echo ""
echo "✅ Health Check Complete!"
echo ""
echo "💡 Tips:"
echo "- For production monitoring, use: Sentry, New Relic, or Datadog"
echo "- Set up uptime monitoring with UptimeRobot or Healthchecks.io"
echo "- Monitor logs with: Loggly, CloudWatch, or Papertrail"
