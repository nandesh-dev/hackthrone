import os

import bcrypt
import pydantic
from bson.objectid import ObjectId
from dotenv import find_dotenv, load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import errors

load_dotenv(find_dotenv())

connection_str = os.environ["MONGODB_CONNECTION_STR"]
client = None


async def open_db() -> None:
    """Open the database connection."""
    global client, users_db  # noqa: PLW0603
    client = AsyncIOMotorClient(connection_str)
    users_db = client.users


async def close_db() -> None:
    """Close the database connection."""
    client.close()


def convert_to_bson_id(bson_id: str) -> ObjectId:
    """Convert a string to a BSON object id."""
    return ObjectId(bson_id)


def switch_id_to_pydantic(data: dict) -> dict:
    """Switches the id key to _id for pydantic models."""
    data["id"] = data["_id"]
    del data["_id"]
    return data


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def compare_passwords(plain_password: str, hashed_password: str) -> bool:
    """Compare a plain password with a hashed password."""
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


async def create_user_db() -> None:
    """Create the user database and collection."""
    await client.drop_database("users")
    auth_validator = {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "email", "hashed_password"],
            "properties": {
                "name": {
                    "bsonType": "string",
                    "description": "must be a string. Full name of user.",
                },
                "email": {
                    "bsonType": "string",
                    "description": "must be a string. Email of user.",
                },
                "hashed_password": {
                    "bsonType": "string",
                    "description": "must be a string. Hashed password of user.",  # noqa: E501
                },
                "keywords": {
                    "bsonType": "array",
                    "items": {
                        "bsonType": "string",
                    },
                    "description": "must be an array of strings. Keywords associated with user.",  # noqa: E501
                },
            },
        },
    }

    try:
        await users_db.create_collection("user_details")
    except Exception as e:  # noqa: BLE001
        print(e)

    await users_db.command("collMod", "user_details", validator=auth_validator)

    await users_db.user_details.create_index("email", unique=True)


class UserModel(pydantic.BaseModel):
    """Pydantic model for user data."""

    id: str
    name: str
    email: pydantic.EmailStr
    keywords: list[str] = []


async def create_user(user_data: dict) -> UserModel:
    """Create a new user in the database."""
    try:
        user_data["keywords"] = user_data.get("keywords", [])
        user_data["hashed_password"] = hash_password(user_data["password"])
        del user_data["password"]
        result = await users_db.user_details.insert_one(user_data)
        user_data["_id"] = result.inserted_id
        user_data = switch_id_to_pydantic(user_data)
        return UserModel(**user_data)
    except errors.DuplicateKeyError as e:
        raise ValueError from e


async def get_user_by(by: str, value: str) -> UserModel | None:
    """Get a user by email."""
    user_data = await users_db.user_details.find_one(
        {by: value},
    )
    if user_data:
        user_data = switch_id_to_pydantic(user_data)
        del user_data["hashed_password"]
        return UserModel(**user_data)
    return None


async def update_user_keywords(
    user_id: str,
    keywords: list[str],
) -> UserModel:
    """Update a user's keywords."""
    await users_db.user_details.update_one(
        {"_id": convert_to_bson_id(user_id)},
        {"$set": {"keywords": keywords}},
    )
    user_data = await users_db.user_details.find_one(
        {"_id": convert_to_bson_id(user_id)},
    )
    user_data = switch_id_to_pydantic(user_data)
    del user_data["hashed_password"]
    return UserModel(**user_data)
