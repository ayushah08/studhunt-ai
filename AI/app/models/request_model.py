from pydantic import BaseModel, ConfigDict, Field


class RoadmapRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    prompt: str = Field(..., min_length=5, max_length=1000)


class RoadmapResponse(BaseModel):
    roadmap: str
