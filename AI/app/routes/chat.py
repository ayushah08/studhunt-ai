from fastapi import APIRouter, HTTPException, status

from ..models.request_model import ChatRequest, ChatResponse
from ..services.chat_service import AIChatServiceError, generate_chat_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(data: ChatRequest) -> ChatResponse:
    try:
        answer = generate_chat_response(message=data.message)
    except AIChatServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc

    return ChatResponse(answer=answer)
