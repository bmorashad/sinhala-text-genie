from enum import Enum
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List, Type, Any

ERROR = 0
SUCCESS = 1

# from language_model.textgen import PredictionMode

class ErrorResponse(BaseModel):
    status: int = ERROR
    message: str

class APIException(HTTPException):
    def __init__(self, status_code: int, message: str):
        error_response = ErrorResponse(message=message)
        super().__init__(status_code=status_code, detail=error_response.dict())
class ResponseBody(BaseModel):
    data: Any
    status: int


class NextWordsResponse(BaseModel):
    prompt: str
    next_words: List[str]
    max_num_of_predictions: int
    # prediction_mode: PredictionMode
    diversity_level: int


class NextWordPairResponse(BaseModel):
    prompt: str
    word_pairs: List[str]
    max_num_of_predictions: int
    # prediction_mode: PredictionMode
    diversity_level: int


class TextGenResponse(BaseModel):
    prompt: str
    generated_texts: List[str]
    max_gen_len: int
    max_num_of_generations: int
