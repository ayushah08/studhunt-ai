import os
from functools import lru_cache

from langchain_huggingface import HuggingFacePipeline

try:
    from langchain_ollama import OllamaLLM as Ollama
except ImportError:
    from langchain_community.llms import Ollama


def _get_default_device() -> int:
    try:
        import torch

        return 0 if torch.cuda.is_available() else -1
    except Exception:
        return -1


def _get_huggingface_llm() -> HuggingFacePipeline:
    model_id = os.getenv("HF_MODEL_ID", "TinyLlama/TinyLlama-1.1B-Chat-v1.0")
    temperature = float(os.getenv("HF_TEMPERATURE", "0.2"))
    max_new_tokens = int(os.getenv("HF_MAX_NEW_TOKENS", "512"))
    local_files_only = os.getenv("HF_LOCAL_FILES_ONLY", "true").lower() == "true"
    device = int(os.getenv("HF_DEVICE", str(_get_default_device())))

    pipeline_kwargs = {
        "max_new_tokens": max_new_tokens,
        "return_full_text": False,
    }

    if temperature > 0:
        pipeline_kwargs["temperature"] = temperature
        pipeline_kwargs["do_sample"] = True
    else:
        pipeline_kwargs["do_sample"] = False

    return HuggingFacePipeline.from_model_id(
        model_id=model_id,
        task="text-generation",
        device=device,
        model_kwargs={"local_files_only": local_files_only},
        pipeline_kwargs=pipeline_kwargs,
        batch_size=1,
    )


def _get_ollama_llm() -> Ollama:
    model_name = os.getenv("OLLAMA_MODEL", "llama3")
    base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    temperature = float(os.getenv("OLLAMA_TEMPERATURE", "0.2"))
    timeout = int(os.getenv("OLLAMA_TIMEOUT", "120"))

    return Ollama(
        model=model_name,
        base_url=base_url,
        temperature=temperature,
        timeout=timeout,
    )


@lru_cache(maxsize=1)
def get_llm():
    provider = os.getenv("LLM_PROVIDER", "huggingface").lower()
    fallback_to_ollama = os.getenv("HF_FALLBACK_TO_OLLAMA", "true").lower() == "true"

    if provider == "ollama":
        return _get_ollama_llm()

    try:
        return _get_huggingface_llm()
    except Exception:
        if fallback_to_ollama:
            return _get_ollama_llm()
        raise
