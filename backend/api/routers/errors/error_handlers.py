from fastapi.encoders import jsonable_encoder
from fastapi import status
from fastapi.responses import JSONResponse

from ..response_models.responses import ErrorResponse


async def handle_api_exception(request, exc):
    error_response = ErrorResponse(detail=exc.detail)
    return JSONResponse(status_code=exc.status_code, content=error_response.dict())


async def handle_request_validation_error(request, exc):
    error_response = jsonable_encoder(
        ErrorResponse(detail=jsonable_encoder({"errors": exc.errors(), "body": exc.body})))
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=error_response)
