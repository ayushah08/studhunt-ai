from fastapi import APIRouter, HTTPException, status

from ..models.request_model import RoadmapRequest, RoadmapResponse
from ..services.roadmap_service import AIServiceError, generate_roadmap

router = APIRouter()


@router.post("/generate-roadmap", response_model=RoadmapResponse)
def roadmap(data: RoadmapRequest) -> RoadmapResponse:
    try:
        result = generate_roadmap(prompt=data.prompt)
    except AIServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc

    return RoadmapResponse(roadmap=result)
