from fastapi import APIRouter
from app.models.request_model import RoadmapRequest
from app.services.roadmap_service import generate_roadmap

router = APIRouter()

@router.post("/generate-roadmap")
def roadmap(data: RoadmapRequest):
    result = generate_roadmap(
        data.goal,
        data.level,
        data.language
    )
    return {"roadmap": result}