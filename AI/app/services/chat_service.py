from ..core.llm import get_llm
from ..utils.prompt import get_chat_prompt


class AIChatServiceError(Exception):
    """Raised when the AI provider cannot generate a chat response."""


def build_chat_chain():
    prompt = get_chat_prompt()
    llm = get_llm()
    return prompt | llm


def _normalize_response(response) -> str:
    if hasattr(response, "content"):
        return str(response.content).strip()

    return str(response).strip()


def generate_chat_response(message: str) -> str:
    try:
        chain = build_chat_chain()
        response = chain.invoke({"message": message})
    except ValueError as exc:
        raise AIChatServiceError(str(exc)) from exc
    except Exception as exc:
        raise AIChatServiceError(f"Chat generation failed: {exc}") from exc

    answer = _normalize_response(response)

    if not answer:
        raise AIChatServiceError("The AI service returned an empty chat response.")

    return answer
