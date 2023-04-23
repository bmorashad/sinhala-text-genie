from pydantic import BaseModel
from typing import List, Type, Any
from language_model.textgen import PredictionMode


class Status:
    ERROR = 0
    SUCCESS = 1
class ErrorResponse(BaseModel):
    status: int = Status.ERROR
    detail: Any

class NextWordsResponse(BaseModel):
    prompt: str
    next_words: List[str]
    max_num_of_predictions: int
    prediction_mode: PredictionMode
    diversity_level: int
    next_words: List[str]


class NextWordPairResponse(BaseModel):
    prompt: str
    word_pairs: List[str]
    max_num_of_predictions: int
    prediction_mode: PredictionMode
    diversity_level: int


class TextGenResponse(BaseModel):
    prompt: str
    generated_texts: List[str]
    max_gen_len: int
    max_num_of_generations: int
