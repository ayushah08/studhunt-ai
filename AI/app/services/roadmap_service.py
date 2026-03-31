from ..core.llm import get_llm
from ..utils.prompt import get_prompt


class AIServiceError(Exception):
    """Raised when the AI provider cannot generate a roadmap."""


def build_chain():
    prompt = get_prompt()
    llm = get_llm()
    return prompt | llm


def generate_roadmap(prompt: str) -> str:
    try:
        chain = build_chain()
        response = chain.invoke({"prompt": prompt})
    except ValueError as exc:
        raise AIServiceError(str(exc)) from exc
    except Exception as exc:
        raise AIServiceError(f"Roadmap generation failed: {exc}") from exc

    if hasattr(response, "content"):
        response_text = str(response.content).strip()
    else:
        response_text = str(response).strip()

    if not response_text:
        raise AIServiceError("The AI service returned an empty roadmap.")

    return response_text
