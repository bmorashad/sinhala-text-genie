from typing import List
from fastapi import APIRouter
from api.models.response import NextWordPredictionResponse
from services.textgen import predict_next_words

router = APIRouter()


@router.get("/next-words")
async def next_words(prompt: str, max_prediction_len: int = 3, max_num_of_predictions: int = 3) -> NextWordPredictionResponse:
    predictions: List[str] = predict_next_words(prompt)
    return NextWordPredictionResponse(prompt=prompt,
                                      predictons=predictions,
                                      max_prediction_len=max_prediction_len,
                                      max_num_of_predictions=max_num_of_predictions)
