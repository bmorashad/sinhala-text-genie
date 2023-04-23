from typing import List
from fastapi import APIRouter

from routers.errors.errors import APIException
from routers.response_models.responses import TextGenResponse
from services.textgen import get_generated_text_list

router = APIRouter()


@router.get("/textgen")
async def generate_texts(prompt: str, max_num_of_generations: int = 1,
                         gen_length: int = 10) -> TextGenResponse:
    try:
        generated_texts: List[str] = get_generated_text_list(prompt, max_num_of_generations, gen_length)
        return TextGenResponse(
            prompt=prompt,
            generated_texts=generated_texts,
            max_gen_length=gen_length,
            max_num_of_generations=max_num_of_generations
        )
    except ValueError as e:
        raise APIException(status_code=413, message=str(e))
