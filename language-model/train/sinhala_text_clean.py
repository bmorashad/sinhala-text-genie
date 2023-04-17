import unicodedata
import re
import tensorflow as tf


def custom_standardization(input_string):
    sentence = tf.strings.regex_replace(input_string, "\n", " ")
    return sentence
def normalize_text(text):
    return unicodedata.normalize('NFKD', text)

def remove_lone_puntuations(line):
    pattern = r"^[!?]*\s*"
    return re.sub(pattern, r"", line)


def add_space_after_puntuation(text):
    pattern = r"([!?.,])(\w)"
    return re.sub(pattern, r"\1 \2", text)


def remove_space_before_puntuation(text):
    pattern = r"(\s+)([!?.,])"
    return re.sub(pattern, r"\2", text)


def remove_english_text(text):
    pattern = "[aA-zZ]+"
    return re.sub(pattern, '', text)


def clean_special_chars(text):
    punct = '#$%&*+-/<=>@:“"\'\\(\\)[\\]^_`{|}~\t\n'
    for p in punct:
        text = text.replace(p, '')
    return text


def remove_extra_spaces(text):
    pattern = " +"
    return re.sub(pattern, ' ', text)


def remove_extra_puntuations(text):
    pattern = '\\?+'
    new_text = re.sub(pattern, '?', text)
    pattern = '!+'
    new_text = re.sub(pattern, '!', new_text)
    pattern = ',+'
    new_text = re.sub(pattern, ',', new_text)
    pattern = '\\.+'
    return re.sub(pattern, '.', new_text)


def remove_number(text):
    return re.sub('[0-9]+', '', text)


def clean_and_tokenize_to_sentences(texts):
    texts = normalize_text(texts)
    texts = clean_special_chars(texts)
    texts = remove_extra_puntuations(texts)
    texts = remove_number(texts)
    texts = remove_english_text(texts)
    texts = remove_space_before_puntuation(texts)
    texts = add_space_after_puntuation(texts)
    texts = remove_extra_spaces(texts)
    text_list = texts.split('.')
    text_list = [line.strip() for line in text_list]
    # remove whitespaces and empty lines
    text_list = [line for line in text_list if line.strip()]
    text_list = [remove_lone_puntuations(line) for line in text_list]
    text_list = list(filter(None, text_list))
    # Remove lines that are likely not meaningful: those with less than one word or less than eight characters.
    text_list = list(filter(lambda line: (len(line.strip().split(" ")) > 1 and len(line) > 7), text_list))
    return text_list


