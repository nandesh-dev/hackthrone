"""Module for configuration settings."""

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Settings for the application."""

    HOST_IP: str = Field()
    HOST_PORT: int = Field()

    model_config = SettingsConfigDict(env_file=".env")


env = Settings()
