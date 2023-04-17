import keras_nlp
import sys
from typing import List
import tensorflow as tf
from tensorflow import keras
import numpy as np
from tensorflow.keras.models import load_model
import joblib
from sinhala_text_processor import custom_standardization
from tensorflow.keras.layers import TextVectorization
import constants
import pickle

index_lookup = joblib.load(constants.INDEX_LOOKUP_FILE)
model = load_model(constants.MODEL_FILE)
vectorizer_file = pickle.load(open(constants.VECTORIZER_FILE, "rb"))
vectorize_layer = TextVectorization.from_config(vectorizer_file['config'])
vectorize_layer.set_weights(vectorizer_file['weights'])

def validate_prompt(func):
    def wrapper(prompt: str, *args, **kwargs) -> List[str]:
        if (len(prompt.split(" ")) >= constants.MAX_LEN):
            raise ValueError("Prompt length exceeds maximum supported length of {} words".
                             format(constants.MAX_LEN))
        return func(prompt, *args, **kwargs)
    return wrapper

def sample_token(logits):
    logits, indices = tf.math.top_k(logits, k=5, sorted=True)
    indices = np.asarray(indices).astype("int32")
    preds = keras.activations.softmax(tf.expand_dims(logits, 0))[0]
    preds = np.asarray(preds).astype("float32")
    return np.random.choice(indices, p=preds)


@validate_prompt
def generate_text(prompt, response_length=3):
    decoded_sample = prompt
    for i in range(response_length - 1):
        tokenized_prompt = vectorize_layer([decoded_sample])[:, :-1]
        predictions = model.predict([tokenized_prompt], verbose=0)
        sample_index = len(decoded_sample.strip().split()) - 1

        sampled_token = sample_token(predictions[0][sample_index])
        sampled_token = index_lookup[sampled_token]
        decoded_sample += " " + sampled_token
    return decoded_sample


@validate_prompt
def predict_next_words(prompt: str, num_of_words=3) -> List[str]:
    tokenized_prompt = vectorize_layer([prompt])[:, :-1]
    predictions = model.predict([tokenized_prompt], verbose=0)
    # print(predictions)
    # print(len(predictions))
    sample_index = len(prompt.strip().split()) - 1
    # print(sample_index)

    # Get the top 3 predicted token indices for the next word
    top_3_indices = tf.math.top_k(predictions[0][sample_index], k=num_of_words).indices.numpy()
    # print(top_3_indices)
    # print(predictions[0][sample_index])

    # Convert the indices to the actual tokens
    top_3_tokens = [index_lookup[index] for index in top_3_indices]

    return list(set(filter(None, top_3_tokens)))

if __name__ == "__main__":
    while True:
        prompt = input("Enter text (q to exit): ")
        if (prompt.lower() == "q"):
            print("Exiting...")
            break
        validate_prompt(prompt)
        print("Next words sample", predict_next_words(prompt, 5))
        print("Text generation sample", generate_text(prompt, 10))
