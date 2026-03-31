from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


class RoadmapRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    prompt: str = Field(..., min_length=5, max_length=1000)


class RoadmapResponse(BaseModel):
    roadmap: str


class ChatRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    message: str = Field(..., min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    answer: str


class StudyTask(str, Enum):
    mcq = "mcq"
    mind_map = "mind_map"
    important_questions = "important_questions"
    summary = "summary"


class DocumentStudyResponse(BaseModel):
    file_name: str
    task: StudyTask
    topic: str | None = None
    output: str
