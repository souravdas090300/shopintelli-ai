#!/bin/bash
set -e

echo "🔄 ShopIntelli AI - Rolling Update Script"
echo "=========================================="

# Configuration
NAMESPACE=${1:-shopintelli}
SERVICE=${2:-all}
VERSION=${3:-latest}
REGISTRY=${4:-ghcr.io/souravdas090300/shopintelli-ai}

echo "Namespace: $NAMESPACE"
echo "Service: $SERVICE"
echo "Version: $VERSION"
echo ""

# Function to update a service
update_service() {
    local service=$1
    local deployment_name=$2
    local image_name=$3
    
    echo "🔄 Updating $service..."
    
    # Update the image
    kubectl set image deployment/$deployment_name \
        $deployment_name=$REGISTRY/$image_name:$VERSION \
        -n $NAMESPACE
    
    # Wait for rollout
    kubectl rollout status deployment/$deployment_name -n $NAMESPACE --timeout=5m
    
    # Check rollout status
    if [ $? -eq 0 ]; then
        echo "✓ $service updated successfully"
    else
        echo "✗ $service update failed"
        echo "Rolling back..."
        kubectl rollout undo deployment/$deployment_name -n $NAMESPACE
        exit 1
    fi
}

# Update services
if [ "$SERVICE" == "all" ] || [ "$SERVICE" == "frontend" ]; then
    update_service "Frontend" "frontend" "frontend"
fi

if [ "$SERVICE" == "all" ] || [ "$SERVICE" == "backend" ]; then
    update_service "Backend" "backend" "backend"
    
    # Run migrations after backend update
    echo "🗃️ Running database migrations..."
    BACKEND_POD=$(kubectl get pod -n $NAMESPACE -l app=backend -o jsonpath="{.items[0].metadata.name}")
    kubectl exec -n $NAMESPACE $BACKEND_POD -- php artisan migrate --force
    kubectl exec -n $NAMESPACE $BACKEND_POD -- php artisan config:cache
    kubectl exec -n $NAMESPACE $BACKEND_POD -- php artisan route:cache
    echo "✓ Migrations completed"
fi

if [ "$SERVICE" == "all" ] || [ "$SERVICE" == "ai-service" ]; then
    update_service "AI Service" "ai-service" "ai-service"
fi

echo ""
echo "✅ Rolling update completed successfully!"
echo ""
echo "Current deployment status:"
kubectl get deployments -n $NAMESPACE
echo ""
kubectl get pods -n $NAMESPACE
