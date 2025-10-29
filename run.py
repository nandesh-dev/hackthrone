import uvicorn

if __name__ == "__main__":
    uvicorn.run("src.backend.main:app", reload=True)
