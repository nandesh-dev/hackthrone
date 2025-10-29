"""Module for configuration settings."""

from secrets import token_urlsafe

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Settings for the application."""

    HOST_IP: str = Field(default="127.0.0.1")
    HOST_PORT: int = Field(default=8080)
    MONGODB_CONNECTION_STR: str = Field()
    AUTH_SECRET: str = Field(default=token_urlsafe(64))
    API_URL: str = Field(default="http://127.0.0.1:8000/api")
    model_config = SettingsConfigDict(env_file=".env")


env = Settings()
