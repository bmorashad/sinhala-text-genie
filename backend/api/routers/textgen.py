from typing import List
from fastapi import APIRouter, Depends

from routers.errors.errors import APIException
from routers.response_models.responses import TextGenResponse
from security.dependencies import validate_token
from services.textgen import get_generated_text_list

router = APIRouter()


@router.get("/textgen", dependencies=[Depends(validate_token)] )
async def generate_texts(prompt: str, max_num_of_generations: int = 1,
                         max_gen_len: int = 10) -> TextGenResponse:
    try:
        generated_texts: List[str] = get_generated_text_list(prompt, max_num_of_generations, max_gen_len)
        return TextGenResponse(
            prompt=prompt,
            generated_texts=generated_texts,
            max_gen_len=max_gen_len,
            max_num_of_generations=max_num_of_generations
        )
    except ValueError as e:
        raise APIException(status_code=413, message=str(e))
