from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    auth0_audience: str = "Hello"
    auth0_domain: str = "Hello"
    client_origin_url: str = "hello"
    port: int = 2
    reload: bool = True

    @classmethod
    @validator("client_origin_url", "auth0_audience", "auth0_domain")
    def check_not_empty(cls, v):
        print("V", v)
        assert v != "", f"{v} is not defined"
        return v

    class Config:
        env_file = ".env.local"
        env_file_encoding = "utf-8"


settings = Settings()