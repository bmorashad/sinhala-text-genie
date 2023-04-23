from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.middleware.cors import CORSMiddleware

from routers import nextword, textgen, wordpair
from routers.errors.errors import APIException
from routers.errors.error_handlers import handle_api_exception, handle_request_validation_error

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,
)

app.add_exception_handler(APIException, handle_api_exception)
app.add_exception_handler(RequestValidationError, handle_request_validation_error)
app.include_router(nextword.router)
app.include_router(textgen.router)
app.include_router(wordpair.router)
