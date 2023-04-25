from typing import List
from fastapi import APIRouter, Depends
from language_model.textgen import PredictionMode
from routers.errors.errors import APIException
from routers.response_models.responses import NextWordsResponse
from security.dependencies import validate_token
from services.textgen import get_next_words

router = APIRouter()


@router.get("/nextwords", dependencies=[Depends(validate_token)])
async def next_words(prompt: str, max_num_of_words: int = 3,
                     prediction_mode: PredictionMode = PredictionMode.CONSISTENT,
                     diversity_level: int = 50) -> NextWordsResponse:
    try:
        predictions: List[str] = get_next_words(prompt, max_num_of_words, prediction_mode, diversity_level)
        return NextWordsResponse(
            prompt=prompt,
            max_num_of_predictions=max_num_of_words,
            diversity_level=diversity_level,
            prediction_mode=prediction_mode,
            next_words=predictions
        )
    except ValueError as e:
        raise APIException(status_code=413, message=str(e))
