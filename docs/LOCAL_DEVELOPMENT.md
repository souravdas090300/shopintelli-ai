# Local development (Docker Compose)

This repository contains a multi-service development stack (Laravel API, React frontend, FastAPI AI microservice, MySQL, Redis) configured to run via Docker Compose.

Quick start (Windows):

1. Ensure prerequisites are installed (Docker Desktop with WSL2, Git, Node, PHP, Composer, Python). Installing via Chocolatey is convenient.
2. From the repository root run (PowerShell):

```powershell
docker compose up --build
```

Services after startup:
- API: http://localhost:8000
- Frontend: http://localhost:3000
- AI service: http://localhost:8001
- phpMyAdmin: http://localhost:8080

Notes:
- The `ai-service` folder contains a minimal FastAPI app (`app/main.py`) with `/health` and `/predict` endpoints — replace with your model logic.
- `backend` and `frontend` Dockerfiles are minimal and intended for dev. For production builds use optimized multi-stage Dockerfiles and a proper webserver for PHP (php-fpm + nginx).

If you want, I can:
- Add sample env files and docker-compose override for development
- Wire up a basic Laravel starter app and a React starter template
- Add GitHub Actions workflow for build/test
