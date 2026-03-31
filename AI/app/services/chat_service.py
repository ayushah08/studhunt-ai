from langchain_community.llms.ollama import OllamaEndpointNotFoundError
from requests import exceptions as requests_exceptions

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
    except OSError as exc:
        raise AIChatServiceError(
            "The Hugging Face model could not be loaded. Check HF_MODEL_ID or disable HF_LOCAL_FILES_ONLY if the model is not cached locally."
        ) from exc
    except OllamaEndpointNotFoundError as exc:
        raise AIChatServiceError(
            "Ollama is running, but the configured model was not found. Pull the model first or update OLLAMA_MODEL."
        ) from exc
    except requests_exceptions.ReadTimeout as exc:
        raise AIChatServiceError(
            "The model took too long to respond. Try again, reduce the prompt size, or increase the timeout."
        ) from exc
    except requests_exceptions.ConnectTimeout as exc:
        raise AIChatServiceError(
            "The connection to the model timed out. Check the configured provider and endpoint."
        ) from exc
    except requests_exceptions.RequestException as exc:
        raise AIChatServiceError(
            "Unable to reach the configured model service."
        ) from exc
    except Exception as exc:
        raise AIChatServiceError(f"Chat generation failed: {exc}") from exc

    answer = _normalize_response(response)

    if not answer:
        raise AIChatServiceError("The AI service returned an empty chat response.")

    return answer
