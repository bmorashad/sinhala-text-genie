from typing import List
from language_model.textgen import predict_next_words, PredictionMode, \
    predict_next_word_pairs, generate_text


def get_next_words(prompt: str, max_num_of_words=3,
                   prediction_mode=PredictionMode.CONSISTENT, diversity_level=50) -> List[str]:
    next_words: List[str] = predict_next_words(prompt, max_num_of_words, prediction_mode, diversity_level)
    return next_words


def get_next_word_pairs(prompt: str, max_num_of_pairs=3,
                        prediction_mode=PredictionMode.CONSISTENT, diversity_level=50) -> List[str]:
    next_word_pairs: List[str] = predict_next_word_pairs(prompt, max_num_of_pairs, prediction_mode, diversity_level)
    return next_word_pairs


def get_generated_text_list(prompt: str, max_num_of_generations=1, gen_len=10) -> List[str]:
    generate_texts: List[str] = generate_text(prompt, max_num_of_generations, gen_len)
    return generate_texts
