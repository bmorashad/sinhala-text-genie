from typing import List
from pydantic import BaseModel


class NextWordPredictionRequest(BaseModel):
    prompt: str
    max_prediction_len: int
    max_num_of_predictions: int


class TextGenRequest(BaseModel):
    prompt: str
    max_gen_len: int
    max_num_of_generations: int
