import random
from enum import Enum
from typing import List
import tensorflow as tf
from tensorflow import keras
import numpy as np
from tensorflow.keras.models import load_model
import joblib
from tensorflow.keras.layers import TextVectorization

from language_model.sinhala_nlp.preprocessor import clean_text_corpus, tokenize, clean_tokenized_text_list, clean_prompt
from language_model.util import constants
import pickle
import keras_nlp
import importlib.util
import os

class PredictionMode(Enum):
    DIVERSE = "diverse"
    CONSISTENT = "consistent"


def tokenize_line(line):
    return line.split(" ")

def detokenize(word_list):
    return " ".join(word_list)

def count_words(line):
    return len(tokenize_line(line))


def trim_start_of_line(line, num_of_words):
    return " ".join(line.split(" ")[num_of_words:])


def trim_prompt_to_max_len(prompt):
    word_count = count_words(prompt)
    if word_count >= 15:
        count_diff = word_count - 15
        prompt = trim_start_of_line(prompt, count_diff + 1)
    return prompt

with open(constants.DATA_FILE, encoding='utf-8') as f:
    texts = f.read()

texts = clean_text_corpus(texts)
text_list = tokenize(texts)
# Due to hardware limitation limiting the corpus size
text_list = text_list[:250000]
text_list = clean_tokenized_text_list(text_list)

index_lookup = joblib.load(constants.INDEX_LOOKUP_FILE)
model = load_model(constants.MODEL_FILE)
vectorizer_file = pickle.load(open(constants.VECTORIZER_FILE, "rb"))
vectorize_layer = TextVectorization.from_config(vectorizer_file['config'])
vectorize_layer.set_weights(vectorizer_file['weights'])


def _validate_prompt(func):
    def wrapper(prompt: str, *args, **kwargs) -> List[str]:
        if len(prompt.split(" ")) >= constants.MAX_LEN:
            raise ValueError("Prompt length exceeds maximum supported length of {} words".
                             format(constants.MAX_LEN))
        return func(prompt, *args, **kwargs)

    return wrapper


def _sample_token(logits):
    logits, indices = tf.math.top_k(logits, k=5, sorted=True)
    indices = np.asarray(indices).astype("int32")
    preds = keras.activations.softmax(tf.expand_dims(logits, 0))[0]
    preds = np.asarray(preds).astype("float32")
    return np.random.choice(indices, p=preds)


def _generate_text(prompt, response_length):
    decoded_sample = prompt
    generated_text = prompt
    for i in range(response_length - 1):
        tokenized_prompt = vectorize_layer([decoded_sample])[:, :-1]
        predictions = model.predict([tokenized_prompt], verbose=0)
        sample_index = len(decoded_sample.strip().split()) - 1
        sampled_token = _sample_token(predictions[0][sample_index])
        sampled_token = index_lookup[sampled_token]
        decoded_sample += " " + sampled_token
        generated_text += " " + sampled_token
        # This is because N is the max len of prompt, anything exceeds that will result in error
        if count_words(decoded_sample) == constants.MAX_LEN:
            decoded_sample = trim_start_of_line(decoded_sample, 1)
    return generated_text


@_validate_prompt
def generate_text(prompt, num_of_text=1, response_length=15):
    cprompt = clean_prompt(prompt)
    generated_text_list = []
    for i in range(num_of_text):
        text = _generate_text(cprompt, response_length)
        generated_text_list.append(text)
    return generated_text_list


@_validate_prompt
def predict_next_words(prompt: str, num_of_words=3, prediction_mode=PredictionMode.CONSISTENT,
                       diversity_level=50) -> List[str]:
    cprompt = clean_prompt(prompt)
    tokenized_prompt = vectorize_layer([cprompt])[:, :-1]
    predictions = model.predict([tokenized_prompt], verbose=0)
    sample_index = len(cprompt.strip().split()) - 1
    k = num_of_words

    # This predicts "diversity_level" number of words and returns a randomly chosen subset of predicted words of size
    # "num_of_words". However, if num of words to be predicted is greater than "diversity_level", then it predicts
    # the top num_of_words.
    if prediction_mode == PredictionMode.DIVERSE and num_of_words < diversity_level:
        k = diversity_level
    top_indices = tf.math.top_k(predictions[0][sample_index], k=k).indices.numpy()
    top_words = [index_lookup[index] for index in top_indices]
    if prediction_mode == PredictionMode.DIVERSE and num_of_words < diversity_level:
        top_words = random.sample(top_words, num_of_words)
    return list((filter(None, top_words)))


@_validate_prompt
def predict_next_word_pairs(prompt: str, num_of_words=3, prediction_mode=PredictionMode.CONSISTENT,
                            diversity_level=50) -> List[str]:
    cprompt = clean_prompt(prompt)
    top_first_words = predict_next_words(cprompt, num_of_words, prediction_mode, diversity_level)
    top_word_pairs = []
    for word in top_first_words:
        new_prompt = cprompt + " " + word
        # This is to make sure that after adding the next word, that it doesn't exceed the max len
        new_prompt = trim_prompt_to_max_len(new_prompt)
        top_second_words = predict_next_words(new_prompt, num_of_words, prediction_mode)
        second_word = top_second_words[0]
        if prediction_mode == PredictionMode.DIVERSE:
            second_word = random.choice(top_second_words)
        top_word_pairs.append(word + " " + second_word)

    return list((filter(None, top_word_pairs)))

def random_text(len=10) -> str:
    random_sentence = ' '.join(random.choice(text_list).replace('\n', ' ').split(' ')[:len])
    return random_sentence


if __name__ == "__main__":
    while True:
        text = input("Enter text (q to exit): ")
        if text.lower() == "q":
            print("Exiting...")
            break
        _validate_prompt(text)
        print("Predicted words", predict_next_words(text, 25))
        print("Predicted diverse words", predict_next_words(text, 5, PredictionMode.DIVERSE))
        print("==================================================================================")
        print("Predicted word pair", predict_next_word_pairs(text, 5, PredictionMode.CONSISTENT))
        print("Predicted diverse word pair", predict_next_word_pairs(text, 5, PredictionMode.DIVERSE))
        print("==================================================================================")
        print("Text generation", generate_text(text, 10))
