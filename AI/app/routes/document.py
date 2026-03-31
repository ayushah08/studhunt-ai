from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from ..models.request_model import DocumentStudyResponse, StudyTask
from ..services.document_service import DocumentServiceError, generate_document_output

router = APIRouter()


@router.post("/study-material", response_model=DocumentStudyResponse)
async def study_material(
    file: UploadFile = File(...),
    task: StudyTask = Form(...),
    topic: str | None = Form(default=None),
    items_count: int | None = Form(default=None),
) -> DocumentStudyResponse:
    try:
        file_bytes = await file.read()
        output = generate_document_output(
            file_name=file.filename or "uploaded-file",
            file_bytes=file_bytes,
            task=task,
            topic=topic,
            items_count=items_count,
        )
    except DocumentServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    return DocumentStudyResponse(
        file_name=file.filename or "uploaded-file",
        task=task,
        topic=topic,
        output=output,
    )
