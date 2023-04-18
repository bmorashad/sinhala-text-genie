from typing import List
from language_model.textgen import predict_next_words, PredictionMode, \
    predict_next_word_pairs, generate_text

def get_next_words(prompt: str, max_prediction_len=3,
                   prediction_mode=PredictionMode.CONSISTENT, diversity_level=50) -> List[str]:
    next_words: List[str] = predict_next_words(prompt, max_prediction_len, prediction_mode, diversity_level)
    return next_words


def get_next_word_pairs(prompt: str, max_prediction_len=3,
                        prediction_mode=PredictionMode.CONSISTENT, diversity_level=50) -> List[str]:
    next_word_pairs: List[str] = predict_next_word_pairs(prompt, max_prediction_len, prediction_mode, diversity_level)
    return next_word_pairs


def get_generated_text_list(prompt: str, max_num_of_generations=1) -> List[str]:
    generate_texts: List[str] = generate_text(prompt, max_num_of_generations)
    return generate_texts
