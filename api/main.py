from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from routers import nextword, textgen
from routers.errors.errors import APIException
from routers.errors.error_handlers import handle_api_exception, handle_request_validation_error

app = FastAPI()
app.add_exception_handler(APIException, handle_api_exception)
app.add_exception_handler(RequestValidationError, handle_request_validation_error)
app.include_router(nextword.router)
app.include_router(textgen.router)
