from langchain.chains import LLMChain
from app.core.llm import get_llm
from app.utils.prompt import get_prompt

llm = get_llm()
prompt = get_prompt()

chain = LLMChain(llm=llm, prompt=prompt)

def generate_roadmap(goal, level, language):
    response = chain.run({
        "goal": goal,
        "level": level,
        "language": language
    })
    return response