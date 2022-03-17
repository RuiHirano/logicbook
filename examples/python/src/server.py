from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    print("startup")

@app.get("/hello")
async def hello():
    return {"message" : "Hello,World"}