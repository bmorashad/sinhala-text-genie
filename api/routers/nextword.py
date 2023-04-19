from typing import List
from fastapi import APIRouter
from routers.errors.errors import APIException
from routers.response_models.responses import NextWordsResponse

# from services.textgen import get_next_words

router = APIRouter()


@router.get("/nextwords")
async def next_words(prompt: str) -> NextWordsResponse:
    # predictions: List[str] = get_next_words(prompt)
    raise APIException(status_code=402, message="hello")
    # return NextWordsResponse()