from fastapi import APIRouter, FastAPI
from routers import process

app = FastAPI()
app.include_router(process.router)