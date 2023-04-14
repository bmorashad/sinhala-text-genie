from typing import List
from fastapi import APIRouter
from api.models.response import TextGenResponse
from services.textgen import generate_text

router = APIRouter()


@router.get("/generate-texts")
async def generate_texts(prompt: str, max_gen_len: int = 10, max_num_of_generations: int = 1) -> TextGenResponse:
    generate_texts: List[str] = generate_text(prompt)
    return TextGenResponse(prompt=prompt, generated_texts=generate_texts,
                           max_gen_len=max_gen_len,
                           max_num_of_generations=max_num_of_generations)
