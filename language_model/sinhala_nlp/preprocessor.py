import unicodedata
import re

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
    punct = '#$%&*+-/<=>@:“"\'\\(\\)[\\]^_`{|}~'
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
    new_text = re.sub(pattern, '.', new_text)
    pattern = r'([.?!,])([.?!,]+)'
    return re.sub(pattern, r"\1", new_text)


def remove_number(text):
    return re.sub('[0-9]+', '', text)

def remove_tabs(text):
    text = text.replace('\t', ' ')
    return text
def remove_new_lines(text):
    pattern = '\n'
    text = text.replace(pattern, ' ')
    return text

def replace_comma_at_end_with_dot(text):
    pattern = ",$"
    return re.sub(pattern, ".", text, flags=re.MULTILINE)

def add_dot_to_end_of_line(text):
    pattern = r"(?<!\.)\n"
    return re.sub(pattern, ".\n", text)


def clean_text_corpus(texts):
    texts = normalize_text(texts)
    texts = replace_comma_at_end_with_dot(texts)
    texts = add_dot_to_end_of_line(texts)
    texts = remove_new_lines(texts)
    texts = remove_tabs(texts)
    texts = clean_special_chars(texts)
    texts = remove_extra_puntuations(texts)
    texts = remove_number(texts)
    texts = remove_english_text(texts)
    texts = remove_space_before_puntuation(texts)
    texts = add_space_after_puntuation(texts)
    texts = remove_extra_spaces(texts)
    return texts

def tokenize(texts: str):
    text_list = texts.split(".")
    return text_list

def clean_tokenized_text_list(text_list):
    text_list = [line.strip() for line in text_list]
    text_list = [line for line in text_list if line.strip()]
    text_list = [remove_lone_puntuations(line) for line in text_list]
    text_list = list(filter(None, text_list))
    text_list = list(filter(lambda x: (len(x.strip().split(" ")) > 1 and len(x) > 7), text_list))
    return text_list



