# ShopIntelli AI - DevOps Deployment Script (PowerShell)
# =======================================================

param(
    [string]$Environment = "development",
    [string]$Namespace = "shopintelli",
    [string]$Version = "latest"
)

$ErrorActionPreference = "Stop"

function Write-ColorOutput($ForegroundColor, $Message) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($Message) {
    Write-ColorOutput Green "✓ $Message"
}

function Write-Error-Message($Message) {
    Write-ColorOutput Red "✗ $Message"
}

function Write-Info($Message) {
    Write-ColorOutput Yellow "ℹ $Message"
}

Write-Output "🚀 ShopIntelli AI - DevOps Deployment Script"
Write-Output "=============================================="
Write-Output ""
Write-Info "Environment: $Environment"
Write-Info "Namespace: $Namespace"
Write-Info "Version: $Version"
Write-Output ""

# Pre-flight checks
Write-Output "📋 Running pre-flight checks..."

if (!(Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Error-Message "kubectl is not installed"
    exit 1
}
Write-Success "kubectl is installed"

if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error-Message "docker is not installed"
    exit 1
}
Write-Success "docker is installed"

if (!(Get-Command helm -ErrorAction SilentlyContinue)) {
    Write-Info "helm is not installed (optional)"
} else {
    Write-Success "helm is installed"
}

# Check cluster connectivity
Write-Output ""
Write-Output "🔌 Checking Kubernetes cluster connectivity..."
try {
    kubectl cluster-info | Out-Null
    Write-Success "Connected to Kubernetes cluster"
    kubectl cluster-info
} catch {
    Write-Error-Message "Cannot connect to Kubernetes cluster"
    exit 1
}

# Create namespace if it doesn't exist
Write-Output ""
Write-Output "📦 Setting up namespace..."
$namespaceExists = kubectl get namespace $Namespace 2>$null
if ($namespaceExists) {
    Write-Info "Namespace $Namespace already exists"
} else {
    kubectl create namespace $Namespace
    Write-Success "Created namespace $Namespace"
}

# Apply secrets
Write-Output ""
Write-Output "🔐 Applying secrets..."
if (Test-Path "k8s\secrets.yaml") {
    kubectl apply -f k8s\secrets.yaml -n $Namespace
    Write-Success "Secrets applied"
} else {
    Write-Error-Message "secrets.yaml not found"
    exit 1
}

# Deploy MySQL
Write-Output ""
Write-Output "💾 Deploying MySQL..."
kubectl apply -f k8s\mysql-deployment.yaml -n $Namespace
kubectl rollout status deployment/mysql -n $Namespace --timeout=3m
Write-Success "MySQL deployed and ready"

# Deploy Redis
Write-Output ""
Write-Output "📮 Deploying Redis..."
kubectl apply -f k8s\redis-deployment.yaml -n $Namespace
kubectl rollout status deployment/redis -n $Namespace --timeout=3m
Write-Success "Redis deployed and ready"

# Deploy Backend
Write-Output ""
Write-Output "⚙️ Deploying Backend (Laravel)..."
kubectl apply -f k8s\laravel-deployment.yaml -n $Namespace
kubectl rollout status deployment/backend -n $Namespace --timeout=5m
Write-Success "Backend deployed and ready"

# Run database migrations
Write-Output ""
Write-Output "🗃️ Running database migrations..."
$backendPod = kubectl get pod -n $Namespace -l app=backend -o jsonpath="{.items[0].metadata.name}"
kubectl exec -n $Namespace $backendPod -- php artisan migrate --force
Write-Success "Migrations completed"

# Deploy AI Service
Write-Output ""
Write-Output "🤖 Deploying AI Service..."
kubectl apply -f k8s\ai-service-deployment.yaml -n $Namespace
kubectl rollout status deployment/ai-service -n $Namespace --timeout=5m
Write-Success "AI Service deployed and ready"

# Deploy Frontend
Write-Output ""
Write-Output "🎨 Deploying Frontend (React)..."
kubectl apply -f k8s\frontend-deployment.yaml -n $Namespace
kubectl rollout status deployment/frontend -n $Namespace --timeout=5m
Write-Success "Frontend deployed and ready"

# Apply Ingress
Write-Output ""
Write-Output "🌐 Configuring Ingress..."
kubectl apply -f k8s\ingress-deployment.yaml -n $Namespace
Write-Success "Ingress configured"

# Display deployment status
Write-Output ""
Write-Output "📊 Deployment Status:"
Write-Output "===================="
kubectl get pods -n $Namespace
Write-Output ""
kubectl get services -n $Namespace
Write-Output ""
kubectl get ingress -n $Namespace

# Health checks
Write-Output ""
Write-Output "🏥 Running health checks..."

# Check Frontend
$frontendPod = kubectl get pod -n $Namespace -l app=frontend -o jsonpath="{.items[0].metadata.name}" 2>$null
if ($frontendPod) {
    try {
        kubectl exec -n $Namespace $frontendPod -- curl -f http://localhost:3000 2>$null | Out-Null
        Write-Success "Frontend health check passed"
    } catch {
        Write-Error-Message "Frontend health check failed"
    }
}

# Check Backend
if ($backendPod) {
    try {
        kubectl exec -n $Namespace $backendPod -- curl -f http://localhost:8000/api/health 2>$null | Out-Null
        Write-Success "Backend health check passed"
    } catch {
        Write-Error-Message "Backend health check failed"
    }
}

# Check AI Service
$aiPod = kubectl get pod -n $Namespace -l app=ai-service -o jsonpath="{.items[0].metadata.name}" 2>$null
if ($aiPod) {
    try {
        kubectl exec -n $Namespace $aiPod -- curl -f http://localhost:8001/health 2>$null | Out-Null
        Write-Success "AI Service health check passed"
    } catch {
        Write-Error-Message "AI Service health check failed"
    }
}

# Display access information
Write-Output ""
Write-Success "🎉 Deployment completed successfully!"
Write-Output "====================================="
Write-Output ""
Write-Output "Access your application at:"
$ingressIp = kubectl get ingress -n $Namespace -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}' 2>$null
if (!$ingressIp) { $ingressIp = "pending" }
Write-Output "  Frontend: http://$ingressIp"
Write-Output "  Backend API: http://$ingressIp/api"
Write-Output "  AI Service: http://$ingressIp/ai"
Write-Output ""
Write-Output "Useful commands:"
Write-Output "  View logs: kubectl logs -f -l app=<service> -n $Namespace"
Write-Output "  Shell access: kubectl exec -it <pod-name> -n $Namespace -- /bin/sh"
Write-Output "  Port forward: kubectl port-forward -n $Namespace svc/<service> <local-port>:<service-port>"
Write-Output ""
Write-Output "To monitor the deployment:"
Write-Output "  kubectl get pods -n $Namespace -w"
