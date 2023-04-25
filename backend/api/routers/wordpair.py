from typing import List
from fastapi import APIRouter
from language_model.textgen import PredictionMode
from routers.errors.errors import APIException
from routers.response_models.responses import NextWordPairResponse
from services.textgen import get_next_word_pairs

router = APIRouter()


@router.get("/wordpairs")
async def word_pairs(prompt: str, max_num_of_pairs: int = 3,
                     prediction_mode: PredictionMode = PredictionMode.CONSISTENT,
                     diversity_level: int = 50) -> NextWordPairResponse:
    try:
        predictions: List[str] = get_next_word_pairs(prompt, max_num_of_pairs, prediction_mode, diversity_level)
        return NextWordPairResponse(
            prompt=prompt,
            max_num_of_predictions=max_num_of_pairs,
            diversity_level=diversity_level,
            prediction_mode=prediction_mode,
            word_pairs=predictions
        )
    except ValueError as e:
        raise APIException(status_code=413, message=str(e))
