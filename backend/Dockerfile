FROM nginx/unit:1.28.0-python3.10

COPY ./api/nginx-unit/config.json /docker-entrypoint.d/config.json

RUN mkdir build

ENV PYTHONPATH=/build

COPY . ./build

WORKDIR ./build

RUN apt update && apt install -y python3-pip                                  \
    && pip3 install -r /build/api/requirements.txt                            \
    && pip3 install -r /build/language_model/requirements.txt                 \
    && apt remove -y python3-pip                                              \
    && apt autoremove --purge -y                                              \
    && rm -rf /var/lib/apt/lists/* /etc/apt/sources.list.d/*.list \


EXPOSE 80