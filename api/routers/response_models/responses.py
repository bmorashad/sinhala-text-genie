from enum import Enum
from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from typing import List, Type, Any
from fastapi.responses import JSONResponse

class ErrorResponse(BaseModel):
    status: int = 0
    detail: Any

class APIException(HTTPException):
    def __init__(self, message: str, status_code: int):
        super().__init__(status_code=status_code, detail={"message": message})

async def handle_api_exception(request, exc):
    error_response = ErrorResponse(detail=exc.detail)
    return JSONResponse(status_code=exc.status_code, content=error_response.dict())

async def handle_request_validation_error(request, exc):
    error_response = jsonable_encoder(ErrorResponse(detail=jsonable_encoder({"errors": exc.errors(), "body": exc.body})))
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=error_response)



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
