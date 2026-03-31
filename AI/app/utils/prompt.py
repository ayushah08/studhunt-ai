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
