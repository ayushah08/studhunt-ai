from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.roadmap import router as roadmap_router

app = FastAPI(
    title="StudHunt AI Service",
    description="AI service for generating personalized study roadmaps.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "StudHunt AI service is running."}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(roadmap_router, tags=["roadmap"])
