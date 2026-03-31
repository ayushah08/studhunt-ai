from fastapi import FastAPI
from app.routes.roadmap import router as roadmap_router

app = FastAPI()

app.include_router(roadmap_router)