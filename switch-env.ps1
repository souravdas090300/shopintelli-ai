# ============================================
# Environment Switcher Script (Windows PowerShell)
# ============================================

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('development','production')]
    [string]$Environment
)

$BackendDir = "backend"
$FrontendDir = "frontend"

Write-Host "🔄 Switching to $Environment environment..." -ForegroundColor Cyan
Write-Host ""

# Backend
$backendEnvFile = "$BackendDir\.env.$Environment"
if (Test-Path $backendEnvFile) {
    Copy-Item $backendEnvFile "$BackendDir\.env" -Force
    Write-Host "✅ Backend: Copied .env.$Environment to .env" -ForegroundColor Green
} else {
    Write-Host "⚠️  Backend: .env.$Environment not found" -ForegroundColor Yellow
}

# Frontend
$frontendEnvFile = "$FrontendDir\.env.$Environment"
if (Test-Path $frontendEnvFile) {
    Copy-Item $frontendEnvFile "$FrontendDir\.env" -Force
    Write-Host "✅ Frontend: Copied .env.$Environment to .env" -ForegroundColor Green
} else {
    Write-Host "⚠️  Frontend: .env.$Environment not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✨ Environment switched to: $Environment" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
if ($Environment -eq "development") {
    Write-Host "  1. Start Docker: docker-compose up -d"
    Write-Host "  2. Run migrations: docker exec shopintelli-api php artisan migrate"
    Write-Host "  3. Access: http://localhost:3000"
} else {
    Write-Host "  1. Update production values in .env files"
    Write-Host "  2. Generate new APP_KEY: docker exec shopintelli-api php artisan key:generate"
    Write-Host "  3. Run migrations: php artisan migrate --force"
    Write-Host "  4. Build frontend: cd frontend; npm run build"
    Write-Host "  5. Deploy to production server"
}
