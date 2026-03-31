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


class ResumeEducation(BaseModel):
    degree: str = Field(..., min_length=2, max_length=200)
    institution: str = Field(..., min_length=2, max_length=200)
    year: str | None = Field(default=None, max_length=50)
    details: list[str] = Field(default_factory=list)


class ResumeExperience(BaseModel):
    role: str = Field(..., min_length=2, max_length=200)
    company: str = Field(..., min_length=2, max_length=200)
    duration: str | None = Field(default=None, max_length=100)
    details: list[str] = Field(default_factory=list)


class ResumeProject(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    technologies: list[str] = Field(default_factory=list)
    details: list[str] = Field(default_factory=list)


class ResumeRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., min_length=5, max_length=200)
    phone: str | None = Field(default=None, max_length=50)
    location: str | None = Field(default=None, max_length=100)
    target_role: str | None = Field(default=None, max_length=120)
    professional_summary: str | None = Field(default=None, max_length=1000)
    skills: list[str] = Field(default_factory=list)
    education: list[ResumeEducation] = Field(default_factory=list)
    experience: list[ResumeExperience] = Field(default_factory=list)
    projects: list[ResumeProject] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)
    achievements: list[str] = Field(default_factory=list)


class ResumeResponse(BaseModel):
    resume: str


class ResumePdfResponse(BaseModel):
    file_name: str
