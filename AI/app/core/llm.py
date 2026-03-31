import os
from functools import lru_cache
from pathlib import Path

from langchain_google_genai import GoogleGenerativeAI
from dotenv import load_dotenv


ROOT_DIR = Path(__file__).resolve().parents[3]
load_dotenv(ROOT_DIR / ".env", override=False)


def _get_env_int(name: str, default: int) -> int:
    return int(os.getenv(name, str(default)))


def _get_env_float(name: str, default: float) -> float:
    return float(os.getenv(name, str(default)))


def _get_gemini_api_key() -> str:
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError(
            "Gemini API key is not set. Set GOOGLE_API_KEY or GEMINI_API_KEY before starting the server."
        )

    return api_key


@lru_cache(maxsize=1)
def get_llm() -> GoogleGenerativeAI:
    return GoogleGenerativeAI(
        model=os.getenv("GEMINI_MODEL", "gemini-3-flash-preview"),
        google_api_key=_get_gemini_api_key(),
        temperature=_get_env_float("GEMINI_TEMPERATURE", 0.4),
        max_output_tokens=_get_env_int("GEMINI_MAX_OUTPUT_TOKENS", 1024),
        top_p=_get_env_float("GEMINI_TOP_P", 0.95),
        top_k=_get_env_int("GEMINI_TOP_K", 40),
        max_retries=_get_env_int("GEMINI_MAX_RETRIES", 2),
    )
