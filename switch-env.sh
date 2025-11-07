#!/bin/bash
# ============================================
# Environment Switcher Script (Linux/Mac)
# ============================================

ENVIRONMENT=$1
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: ./switch-env.sh [development|production]"
    echo "Example: ./switch-env.sh development"
    exit 1
fi

if [ "$ENVIRONMENT" != "development" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo "❌ Error: Environment must be 'development' or 'production'"
    exit 1
fi

echo "🔄 Switching to $ENVIRONMENT environment..."
echo ""

# Backend
if [ -f "$BACKEND_DIR/.env.$ENVIRONMENT" ]; then
    cp "$BACKEND_DIR/.env.$ENVIRONMENT" "$BACKEND_DIR/.env"
    echo "✅ Backend: Copied .env.$ENVIRONMENT to .env"
else
    echo "⚠️  Backend: .env.$ENVIRONMENT not found"
fi

# Frontend
if [ -f "$FRONTEND_DIR/.env.$ENVIRONMENT" ]; then
    cp "$FRONTEND_DIR/.env.$ENVIRONMENT" "$FRONTEND_DIR/.env"
    echo "✅ Frontend: Copied .env.$ENVIRONMENT to .env"
else
    echo "⚠️  Frontend: .env.$ENVIRONMENT not found"
fi

echo ""
echo "✨ Environment switched to: $ENVIRONMENT"
echo ""
echo "Next steps:"
if [ "$ENVIRONMENT" == "development" ]; then
    echo "  1. Start Docker: docker-compose up -d"
    echo "  2. Run migrations: docker exec shopintelli-api php artisan migrate"
    echo "  3. Access: http://localhost:3000"
else
    echo "  1. Update production values in .env files"
    echo "  2. Generate new APP_KEY: php artisan key:generate"
    echo "  3. Run migrations: php artisan migrate --force"
    echo "  4. Build frontend: cd frontend && npm run build"
    echo "  5. Deploy to production server"
fi
