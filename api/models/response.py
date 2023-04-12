from pydantic import BaseModel
from typing import List


class NextWordPredictionResponse(BaseModel):
    prompt: str
    predictions: List[str]
    max_prediction_len: int
    max_num_of_predictions: int


class TextGenResponse(BaseModel):
    prompt: str
    generated_texts: List[str]
    max_gen_len: int
    max_num_of_generations: int
