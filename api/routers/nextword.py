from typing import List
from fastapi import APIRouter

from api.models.request import NextWordPredictionRequest
from api.models.response import NextWordPredictionResponse
from services.textgen import predict_next_words

router = APIRouter()


@router.get("/next-words")
async def next_words(nwp_req: NextWordPredictionRequest) -> NextWordPredictionResponse:
    predictions: List[str] = predict_next_words(nwp_req.prompt)
    return NextWordPredictionResponse(prompt=nwp_req.prompt,
                                      predictons=predictions,
                                      max_prediction_len=nwp_req.max_prediction_len,
                                      max_num_of_predictions=nwp_req.max_num_of_predictions)
