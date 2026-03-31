from io import BytesIO

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse

from ..models.request_model import ResumeRequest, ResumeResponse
from ..services.resume_service import (
    ResumeServiceError,
    create_resume_pdf_bytes,
    generate_resume,
    get_resume_pdf_file_name,
)

router = APIRouter()


@router.post("/resume", response_model=ResumeResponse)
def resume(data: ResumeRequest) -> ResumeResponse:
    try:
        resume_text = generate_resume(data)
    except ResumeServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    return ResumeResponse(resume=resume_text)


@router.post("/resume/pdf")
def resume_pdf(data: ResumeRequest) -> StreamingResponse:
    try:
        resume_text = generate_resume(data)
        pdf_bytes = create_resume_pdf_bytes(resume_text)
        file_name = get_resume_pdf_file_name(data.name)
    except ResumeServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    return StreamingResponse(
        BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{file_name}"'},
    )
