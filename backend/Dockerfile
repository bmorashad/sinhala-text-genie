FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10
EXPOSE 80

COPY ./api/requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./language_model/requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

WORKDIR /app/backend/api

ENV PYTHONPATH=/app/backend


COPY ./api /app/backend/api
COPY ./language_model /app/backend/language_model