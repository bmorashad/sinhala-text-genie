from dotenv import load_dotenv
load_dotenv()



from language_model.textgen import PredictionMode
import secure
import uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.middleware.cors import CORSMiddleware
from config import settings
from routers import nextword, textgen, wordpair, random_sample
from routers.errors.errors import APIException
from routers.errors.error_handlers import handle_api_exception, handle_request_validation_error

app = FastAPI()

csp = secure.ContentSecurityPolicy().default_src("'self'").frame_ancestors("'none'")
hsts = secure.StrictTransportSecurity().max_age(31536000).include_subdomains()
referrer = secure.ReferrerPolicy().no_referrer()
cache_value = secure.CacheControl().no_cache().no_store().max_age(0).must_revalidate()
x_frame_options = secure.XFrameOptions().deny()

secure_headers = secure.Secure(
    csp=csp,
    hsts=hsts,
    referrer=referrer,
    cache=cache_value,
    xfo=x_frame_options,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.client_origin_url],
    allow_methods=["GET"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,
)

@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.framework.fastapi(response)
    return response

app.add_exception_handler(APIException, handle_api_exception)
app.add_exception_handler(RequestValidationError, handle_request_validation_error)
app.include_router(nextword.router)
app.include_router(textgen.router)
app.include_router(wordpair.router)
app.include_router(random_sample.router)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=settings.reload,
        server_header=False,
    )