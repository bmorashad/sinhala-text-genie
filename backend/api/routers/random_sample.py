from typing import List
from fastapi import APIRouter, Depends
from routers.response_models.responses import TextGenResponse, RandomTextResponse
from security.dependencies import validate_token
from services.textgen import get_random_text

router = APIRouter()


@router.get("/random/text", dependencies=[Depends(validate_token)] )
async def generate_random_samples(num_of_texts: int = 5, len: int = 10) -> RandomTextResponse:
    generated_texts: List[str] = get_random_text(num_of_texts, len)
    return RandomTextResponse(text_list=generated_texts, len=len)
