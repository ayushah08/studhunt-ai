from langchain_core.prompts import PromptTemplate


def get_prompt() -> PromptTemplate:
    template = """
    You are an expert career mentor.

    Create a structured learning roadmap based on the user's request.

    User prompt: {prompt}

    Rules:
    - Divide into 5-7 phases
    - Each phase must include:
      - Title
      - Topics
      - Projects
    - Keep it beginner friendly
    - Use clear, concise language
    - Tailor the roadmap to the provided goal and skill level

    Output format:

    Phase 1: <Title>
    Topics:
    - ...
    Projects:
    - ...

    Phase 2: ...
    """

    return PromptTemplate(
        input_variables=["prompt"],
        template=template,
    )


def get_chat_prompt() -> PromptTemplate:
    template = """
    You are StudHunt, a helpful AI study assistant for students.

    Student message:
    {message}

    Instructions:
    - Answer the student's latest message directly.
    - Be clear, supportive, and practical.
    - Keep the answer concise unless the student asks for detail.
    - If the student asks for a plan, break it into simple steps.
    - If you do not know something, say so briefly and suggest the next best step.

    Assistant:
    """

    return PromptTemplate(
        input_variables=["message"],
        template=template,
    )
