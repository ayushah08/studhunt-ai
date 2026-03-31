import io
import re

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

from ..core.llm import get_llm
from ..models.request_model import ResumeRequest
from ..utils.prompt import get_resume_prompt


class ResumeServiceError(Exception):
    """Raised when resume generation fails."""


def build_resume_chain():
    prompt = get_resume_prompt()
    llm = get_llm()
    return prompt | llm


def _normalize_response(response) -> str:
    if hasattr(response, "content"):
        return str(response.content).strip()

    return str(response).strip()


def _format_resume_request(data: ResumeRequest) -> str:
    lines: list[str] = [
        f"Name: {data.name}",
        f"Email: {data.email}",
        f"Phone: {data.phone or 'Not provided'}",
        f"Location: {data.location or 'Not provided'}",
        f"Target role: {data.target_role or 'Not provided'}",
        f"Professional summary: {data.professional_summary or 'Not provided'}",
    ]

    lines.append("Skills:")
    if data.skills:
        lines.extend(f"- {skill}" for skill in data.skills)
    else:
        lines.append("- Not provided")

    lines.append("Education:")
    if data.education:
        for item in data.education:
            lines.append(
                f"- {item.degree}, {item.institution}"
                + (f" ({item.year})" if item.year else "")
            )
            lines.extend(f"  - {detail}" for detail in item.details)
    else:
        lines.append("- Not provided")

    lines.append("Experience:")
    if data.experience:
        for item in data.experience:
            lines.append(
                f"- {item.role} at {item.company}"
                + (f" ({item.duration})" if item.duration else "")
            )
            lines.extend(f"  - {detail}" for detail in item.details)
    else:
        lines.append("- Not provided")

    lines.append("Projects:")
    if data.projects:
        for item in data.projects:
            project_line = f"- {item.name}"
            if item.technologies:
                project_line += f" | Technologies: {', '.join(item.technologies)}"
            lines.append(project_line)
            lines.extend(f"  - {detail}" for detail in item.details)
    else:
        lines.append("- Not provided")

    lines.append("Certifications:")
    if data.certifications:
        lines.extend(f"- {item}" for item in data.certifications)
    else:
        lines.append("- Not provided")

    lines.append("Achievements:")
    if data.achievements:
        lines.extend(f"- {item}" for item in data.achievements)
    else:
        lines.append("- Not provided")

    return "\n".join(lines)


def generate_resume(data: ResumeRequest) -> str:
    try:
        chain = build_resume_chain()
        response = chain.invoke({"candidate_info": _format_resume_request(data)})
    except ValueError as exc:
        raise ResumeServiceError(str(exc)) from exc
    except Exception as exc:
        raise ResumeServiceError(f"Resume generation failed: {exc}") from exc

    resume = _normalize_response(response)
    if not resume:
        raise ResumeServiceError("The AI service returned an empty resume.")

    return resume


def _sanitize_file_name(name: str) -> str:
    sanitized = re.sub(r"[^A-Za-z0-9_-]+", "_", name.strip())
    return sanitized or "resume"


def _wrap_text(text: str, font_name: str, font_size: int, max_width: float) -> list[str]:
    words = text.split()
    if not words:
        return [""]

    lines: list[str] = []
    current = words[0]

    for word in words[1:]:
        candidate = f"{current} {word}"
        if stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word

    lines.append(current)
    return lines


def create_resume_pdf_bytes(resume_text: str) -> bytes:
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    left_margin = 0.75 * inch
    right_margin = 0.75 * inch
    top_margin = height - 0.75 * inch
    bottom_margin = 0.75 * inch
    max_width = width - left_margin - right_margin
    y = top_margin

    def new_page() -> float:
        pdf.showPage()
        return top_margin

    for raw_line in resume_text.splitlines():
        line = raw_line.rstrip()
        if not line.strip():
            y -= 10
            if y < bottom_margin:
                y = new_page()
            continue

        if not line.startswith("-") and len(line) <= 45:
            font_name = "Helvetica-Bold"
            font_size = 13
        else:
            font_name = "Helvetica"
            font_size = 10

        wrapped_lines = _wrap_text(line, font_name, font_size, max_width)

        for wrapped_line in wrapped_lines:
            if y < bottom_margin:
                y = new_page()

            pdf.setFont(font_name, font_size)
            pdf.drawString(left_margin, y, wrapped_line)
            y -= 14

    pdf.save()
    buffer.seek(0)
    return buffer.getvalue()


def get_resume_pdf_file_name(name: str) -> str:
    return f"{_sanitize_file_name(name)}_resume.pdf"
