from requests import exceptions as requests_exceptions
from langchain_community.llms.ollama import OllamaEndpointNotFoundError

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
    except OSError as exc:
        raise AIServiceError(
            "The Hugging Face model could not be loaded. Check HF_MODEL_ID or disable HF_LOCAL_FILES_ONLY if the model is not cached locally."
        ) from exc
    except OllamaEndpointNotFoundError as exc:
        raise AIServiceError(
            "Ollama is running, but the configured model was not found. Pull the model first or update OLLAMA_MODEL."
        ) from exc
    except requests_exceptions.ReadTimeout as exc:
        raise AIServiceError(
            "Ollama took too long to respond. Try again, use a smaller model, or increase OLLAMA_TIMEOUT."
        ) from exc
    except requests_exceptions.ConnectTimeout as exc:
        raise AIServiceError(
            "The connection to Ollama timed out. Check OLLAMA_BASE_URL and make sure Ollama is reachable."
        ) from exc
    except requests_exceptions.RequestException as exc:
        raise AIServiceError(
            "Unable to reach the Ollama service. Make sure Ollama is running and the model is available."
        ) from exc
    except Exception as exc:
        raise AIServiceError(f"Roadmap generation failed: {exc}") from exc

    if hasattr(response, "content"):
        response_text = str(response.content).strip()
    else:
        response_text = str(response).strip()

    if not response_text:
        raise AIServiceError("The AI service returned an empty roadmap.")

    return response_text
