from typing import List
from fastapi import APIRouter

# from language_model.textgen import PredictionMode
from routers.errors.errors import APIException
from routers.response_models.responses import NextWordsResponse

# from services.textgen import get_next_words

router = APIRouter()


@router.get("/nextwords")
async def next_words(prompt: str, max_num_of_predictions: int = 3,
                     # prediction_mode: str = PredictionMode.CONSISTENT,
                     prediction_mode: str = "consistent",
                     diversity_level: int = 50) -> NextWordsResponse:
    # predictions: List[str] = get_next_words(prompt)
    raise APIException(status_code=402, message="hello")
    # return NextWordsResponse()