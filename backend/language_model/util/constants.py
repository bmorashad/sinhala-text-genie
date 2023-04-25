import os

# Get the absolute path of the current module
_module_path = os.path.abspath(__file__)
_module_dir = os.path.dirname(_module_path)

MAX_LEN = 15
DATA_FILE = "../dataset/sinhala-lines.csv"
MODEL_DIR = os.path.join(_module_dir, '..', 'model')
MODEL_FILE = os.path.join(MODEL_DIR, "model.h5")
MODEL_CHECKPOINT_FILE = os.path.join(MODEL_DIR, "model_checkpoint.h5")
VECTORIZER_FILE = os.path.join(MODEL_DIR, "vectorizer.pkl")
INDEX_LOOKUP_FILE = os.path.join(MODEL_DIR, "index_lookup.joblib")

