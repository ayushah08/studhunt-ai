import io
import os
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from ..core.llm import get_llm
from ..models.request_model import StudyTask
from ..utils.prompt import get_document_prompt


class DocumentServiceError(Exception):
    """Raised when the uploaded study material cannot be processed."""


SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}
MAX_FILE_SIZE_BYTES = int(os.getenv("DOCUMENT_MAX_FILE_SIZE_BYTES", str(10 * 1024 * 1024)))
MAX_CONTENT_CHARS = int(os.getenv("DOCUMENT_MAX_CONTENT_CHARS", "12000"))


def build_document_chain():
    prompt = get_document_prompt()
    llm = get_llm()
    return prompt | llm


def _normalize_response(response) -> str:
    if hasattr(response, "content"):
        return str(response.content).strip()

    return str(response).strip()


def _extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        from pypdf import PdfReader
    except ImportError as exc:
        raise DocumentServiceError(
            "PDF support is not installed. Install pypdf to process PDF files."
        ) from exc

    reader = PdfReader(io.BytesIO(file_bytes))
    pages: list[str] = []
    for page in reader.pages:
        pages.append(page.extract_text() or "")

    return "\n".join(pages).strip()


def _extract_text_from_docx(file_bytes: bytes) -> str:
    try:
        with zipfile.ZipFile(io.BytesIO(file_bytes)) as archive:
            document_xml = archive.read("word/document.xml")
    except KeyError as exc:
        raise DocumentServiceError("The uploaded DOCX file is invalid.") from exc
    except zipfile.BadZipFile as exc:
        raise DocumentServiceError("The uploaded DOCX file is corrupted.") from exc

    root = ET.fromstring(document_xml)
    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    paragraphs: list[str] = []

    for paragraph in root.findall(".//w:p", namespace):
        texts = [node.text for node in paragraph.findall(".//w:t", namespace) if node.text]
        if texts:
            paragraphs.append("".join(texts))

    return "\n".join(paragraphs).strip()


def _extract_text_from_text_file(file_bytes: bytes) -> str:
    return file_bytes.decode("utf-8", errors="ignore").strip()


def extract_text_from_document(file_name: str, file_bytes: bytes) -> str:
    if not file_name:
        raise DocumentServiceError("The uploaded file must have a valid name.")

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise DocumentServiceError("The uploaded file is too large to process.")

    extension = Path(file_name).suffix.lower()
    if extension not in SUPPORTED_EXTENSIONS:
        raise DocumentServiceError(
            "Unsupported file type. Please upload a PDF, DOCX, TXT, or MD file."
        )

    if extension == ".pdf":
        text = _extract_text_from_pdf(file_bytes)
    elif extension == ".docx":
        text = _extract_text_from_docx(file_bytes)
    else:
        text = _extract_text_from_text_file(file_bytes)

    if not text:
        raise DocumentServiceError("No readable text was found in the uploaded document.")

    return text[:MAX_CONTENT_CHARS]


def generate_document_output(
    file_name: str,
    file_bytes: bytes,
    task: StudyTask,
    topic: str | None = None,
    items_count: int = 10,
) -> str:
    content = extract_text_from_document(file_name=file_name, file_bytes=file_bytes)

    try:
        chain = build_document_chain()
        response = chain.invoke(
            {
                "file_name": file_name,
                "task": task.value,
                "topic": topic or "Use the most important topics from the document.",
                "content": content,
                "items_count": items_count,
            }
        )
    except ValueError as exc:
        raise DocumentServiceError(str(exc)) from exc
    except Exception as exc:
        raise DocumentServiceError(f"Document generation failed: {exc}") from exc

    output = _normalize_response(response)
    if not output:
        raise DocumentServiceError("The AI service returned an empty response.")

    return output
