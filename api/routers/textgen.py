from typing import List
from fastapi import APIRouter
from routers.response_models.responses import TextGenResponse

# from services.textgen import generate_text

router = APIRouter()


@router.get("/textgen")
async def generate_texts(prompt: str, max_gen_len: int = 10, max_num_of_generations: int = 1) -> TextGenResponse:
    # generate_texts: List[str] = generate_text(prompt)
    return TextGenResponse()
