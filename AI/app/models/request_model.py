from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    goal: str
    level: str
    language: str