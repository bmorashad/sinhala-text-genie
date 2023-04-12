from fastapi import FastAPI
from routers import nextword, textgen

app = FastAPI()
app.include_router(nextword.router)
app.include_router(textgen.router)
