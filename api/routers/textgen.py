from typing import List
from fastapi import APIRouter

from api.models.request import TextGenRequest
from api.models.response import TextGenResponse
from services.textgen import generate_text

router = APIRouter()


@router.get("/generate-texts")
async def generate_texts(text_gen_req: TextGenRequest) -> TextGenResponse:
    generate_texts: List[str] = generate_text(text_gen_req.prompt)
    return TextGenResponse(
        prompt= text_gen_req.prompt,
        generated_texts= generate_texts,
        max_gen_len= text_gen_req.max_gen_len,
        max_num_of_generations= text_gen_req.max_num_of_generations
    )
