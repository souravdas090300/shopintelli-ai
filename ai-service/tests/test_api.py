from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get('/health')
    assert res.status_code == 200
    data = res.json()
    assert data.get('status') in {'healthy', 'unhealthy'}

def test_root():
    res = client.get('/')
    assert res.status_code == 200
