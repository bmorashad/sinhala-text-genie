from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    auth0_audience: str
    auth0_domain: str
    client_origin_url: str
    port: int = 2
    reload: bool = True

    @classmethod
    @validator("client_origin_url", "auth0_audience", "auth0_domain")
    def check_not_empty(cls, v):
        print("V", v)
        assert v != "", f"{v} is not defined"
        return v

    class Config:
        env_file = "api/.env"
        env_file_encoding = "utf-8"


settings = Settings()