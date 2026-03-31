from app.core.llm import get_llm
from app.utils.prompt import get_prompt

llm = get_llm()
prompt = get_prompt()

# NEW PIPELINE
chain = prompt | llm

def generate_roadmap(goal, level, language):
    response = chain.invoke({
        "goal": goal,
        "level": level,
        "language": language
    })
    return response