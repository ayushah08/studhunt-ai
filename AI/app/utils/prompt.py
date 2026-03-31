from langchain.prompts import PromptTemplate

def get_prompt():
    template = """
    You are an expert career mentor.

    Create a structured learning roadmap.

    Goal: {goal}
    Level: {level}
    Language: {language}

    Rules:
    - Divide into 5-7 phases
    - Each phase must include:
        Title
        Topics
        Projects
    - Keep it beginner friendly

    Output format:

    Phase 1: <Title>
    Topics:
    - ...
    Projects:
    - ...

    Phase 2: ...
    """

    return PromptTemplate(
        input_variables=["goal", "level", "language"],
        template=template
    )