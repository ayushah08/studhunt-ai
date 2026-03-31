from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.chat import router as chat_router
from .routes.document import router as document_router
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
app.include_router(chat_router, tags=["chat"])
app.include_router(document_router, tags=["document"])
