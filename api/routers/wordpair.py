from typing import List
from fastapi import APIRouter
from routers.response_models.responses import NextWordsResponse, NextWordPairResponse
# from services.textgen import get_next_words

router = APIRouter()


@router.get("/wordpair")
async def word_pair(prompt: str, max_prediction_len: int = 3, max_num_of_predictions: int = 3) -> NextWordPairResponse:
    # predictions: List[str] = get_next_words(prompt)
    return NextWordPairResponse()