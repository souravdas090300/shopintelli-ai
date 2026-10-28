#!/bin/bash
set -e

echo "📊 ShopIntelli AI - Health Check Script"
echo "========================================"

NAMESPACE=${1:-shopintelli}
TIMEOUT=${2:-30}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_pod_health() {
    local app_label=$1
    local service_name=$2
    local port=$3
    local health_endpoint=$4
    
    echo -n "Checking $service_name... "
    
    POD=$(kubectl get pod -n $NAMESPACE -l app=$app_label -o jsonpath="{.items[0].metadata.name}" 2>/dev/null)
    
    if [ -z "$POD" ]; then
        echo -e "${RED}FAILED${NC} - No pod found"
        return 1
    fi
    
    # Check if pod is running
    STATUS=$(kubectl get pod $POD -n $NAMESPACE -o jsonpath="{.status.phase}")
    if [ "$STATUS" != "Running" ]; then
        echo -e "${RED}FAILED${NC} - Pod status: $STATUS"
        return 1
    fi
    
    # Check health endpoint if provided
    if [ ! -z "$health_endpoint" ]; then
        if kubectl exec -n $NAMESPACE $POD -- curl -f -s http://localhost:$port$health_endpoint > /dev/null 2>&1; then
            echo -e "${GREEN}HEALTHY${NC}"
            return 0
        else
            echo -e "${YELLOW}WARNING${NC} - Health endpoint unreachable"
            return 1
        fi
    else
        echo -e "${GREEN}RUNNING${NC}"
        return 0
    fi
}

echo "Namespace: $NAMESPACE"
echo "Timeout: ${TIMEOUT}s"
echo ""

FAILED=0

# Check MySQL
check_pod_health "mysql" "MySQL" "3306" "" || FAILED=1

# Check Redis
check_pod_health "redis" "Redis" "6379" "" || FAILED=1

# Check Backend
check_pod_health "backend" "Backend API" "8000" "/api/health" || FAILED=1

# Check Frontend
check_pod_health "frontend" "Frontend" "3000" "" || FAILED=1

# Check AI Service
check_pod_health "ai-service" "AI Service" "8001" "/health" || FAILED=1

echo ""
echo "📋 Resource Usage:"
echo "=================="
kubectl top pods -n $NAMESPACE 2>/dev/null || echo "Metrics server not available"

echo ""
echo "🔍 Pod Details:"
echo "==============="
kubectl get pods -n $NAMESPACE -o wide

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All health checks passed${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}❌ Some health checks failed${NC}"
    exit 1
fi
