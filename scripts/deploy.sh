#!/bin/bash
set -e

echo "🚀 ShopIntelli AI - DevOps Deployment Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-development}
NAMESPACE=${2:-shopintelli}
VERSION=${3:-latest}

echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}"
echo -e "${YELLOW}Namespace: ${NAMESPACE}${NC}"
echo -e "${YELLOW}Version: ${VERSION}${NC}"
echo ""

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Pre-flight checks
echo "📋 Running pre-flight checks..."

if ! command_exists kubectl; then
    print_error "kubectl is not installed"
    exit 1
fi
print_success "kubectl is installed"

if ! command_exists docker; then
    print_error "docker is not installed"
    exit 1
fi
print_success "docker is installed"

if ! command_exists helm; then
    print_info "helm is not installed (optional)"
else
    print_success "helm is installed"
fi

# Check cluster connectivity
echo ""
echo "🔌 Checking Kubernetes cluster connectivity..."
if kubectl cluster-info &>/dev/null; then
    print_success "Connected to Kubernetes cluster"
    kubectl cluster-info
else
    print_error "Cannot connect to Kubernetes cluster"
    exit 1
fi

# Create namespace if it doesn't exist
echo ""
echo "📦 Setting up namespace..."
if kubectl get namespace $NAMESPACE &>/dev/null; then
    print_info "Namespace $NAMESPACE already exists"
else
    kubectl create namespace $NAMESPACE
    print_success "Created namespace $NAMESPACE"
fi

# Apply secrets
echo ""
echo "🔐 Applying secrets..."
if [ -f "k8s/secrets.yaml" ]; then
    kubectl apply -f k8s/secrets.yaml -n $NAMESPACE
    print_success "Secrets applied"
else
    print_error "secrets.yaml not found"
    exit 1
fi

# Deploy MySQL
echo ""
echo "💾 Deploying MySQL..."
kubectl apply -f k8s/mysql-deployment.yaml -n $NAMESPACE
kubectl rollout status deployment/mysql -n $NAMESPACE --timeout=3m
print_success "MySQL deployed and ready"

# Deploy Redis
echo ""
echo "📮 Deploying Redis..."
kubectl apply -f k8s/redis-deployment.yaml -n $NAMESPACE
kubectl rollout status deployment/redis -n $NAMESPACE --timeout=3m
print_success "Redis deployed and ready"

# Deploy Backend
echo ""
echo "⚙️ Deploying Backend (Laravel)..."
kubectl apply -f k8s/laravel-deployment.yaml -n $NAMESPACE
kubectl rollout status deployment/backend -n $NAMESPACE --timeout=5m
print_success "Backend deployed and ready"

# Run database migrations
echo ""
echo "🗃️ Running database migrations..."
BACKEND_POD=$(kubectl get pod -n $NAMESPACE -l app=backend -o jsonpath="{.items[0].metadata.name}")
kubectl exec -n $NAMESPACE $BACKEND_POD -- php artisan migrate --force
print_success "Migrations completed"

# Deploy AI Service
echo ""
echo "🤖 Deploying AI Service..."
kubectl apply -f k8s/ai-service-deployment.yaml -n $NAMESPACE
kubectl rollout status deployment/ai-service -n $NAMESPACE --timeout=5m
print_success "AI Service deployed and ready"

# Deploy Frontend
echo ""
echo "🎨 Deploying Frontend (React)..."
kubectl apply -f k8s/frontend-deployment.yaml -n $NAMESPACE
kubectl rollout status deployment/frontend -n $NAMESPACE --timeout=5m
print_success "Frontend deployed and ready"

# Apply Ingress
echo ""
echo "🌐 Configuring Ingress..."
kubectl apply -f k8s/ingress-deployment.yaml -n $NAMESPACE
print_success "Ingress configured"

# Display deployment status
echo ""
echo "📊 Deployment Status:"
echo "===================="
kubectl get pods -n $NAMESPACE
echo ""
kubectl get services -n $NAMESPACE
echo ""
kubectl get ingress -n $NAMESPACE

# Health checks
echo ""
echo "🏥 Running health checks..."

# Check Frontend
FRONTEND_POD=$(kubectl get pod -n $NAMESPACE -l app=frontend -o jsonpath="{.items[0].metadata.name}" 2>/dev/null || echo "")
if [ ! -z "$FRONTEND_POD" ]; then
    if kubectl exec -n $NAMESPACE $FRONTEND_POD -- curl -f http://localhost:3000 &>/dev/null; then
        print_success "Frontend health check passed"
    else
        print_error "Frontend health check failed"
    fi
fi

# Check Backend
if [ ! -z "$BACKEND_POD" ]; then
    if kubectl exec -n $NAMESPACE $BACKEND_POD -- curl -f http://localhost:8000/api/health &>/dev/null; then
        print_success "Backend health check passed"
    else
        print_error "Backend health check failed"
    fi
fi

# Check AI Service
AI_POD=$(kubectl get pod -n $NAMESPACE -l app=ai-service -o jsonpath="{.items[0].metadata.name}" 2>/dev/null || echo "")
if [ ! -z "$AI_POD" ]; then
    if kubectl exec -n $NAMESPACE $AI_POD -- curl -f http://localhost:8001/health &>/dev/null; then
        print_success "AI Service health check passed"
    else
        print_error "AI Service health check failed"
    fi
fi

# Display access information
echo ""
echo "🎉 Deployment completed successfully!"
echo "====================================="
echo ""
echo "Access your application at:"
INGRESS_IP=$(kubectl get ingress -n $NAMESPACE -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "pending")
echo "  Frontend: http://$INGRESS_IP"
echo "  Backend API: http://$INGRESS_IP/api"
echo "  AI Service: http://$INGRESS_IP/ai"
echo ""
echo "Useful commands:"
echo "  View logs: kubectl logs -f -l app=<service> -n $NAMESPACE"
echo "  Shell access: kubectl exec -it <pod-name> -n $NAMESPACE -- /bin/sh"
echo "  Port forward: kubectl port-forward -n $NAMESPACE svc/<service> <local-port>:<service-port>"
echo ""
echo "To monitor the deployment:"
echo "  watch kubectl get pods -n $NAMESPACE"
