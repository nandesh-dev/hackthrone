import uvicorn
from src.backend.config import env

if __name__ == "__main__":
    uvicorn.run(
        "src.backend.main:app",
        host=env.HOST_IP,
        port=env.HOST_PORT,
        reload=True,
    )
