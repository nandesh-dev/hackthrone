from fastapi import APIRouter, BackgroundTasks, HTTPException, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from src.backend.utils.database_handler import (
    compare_passwords,
    create_user,
    get_user_by,
)
from src.backend.utils.keyword_handler import user_keyword_handler

router = APIRouter(prefix="/auth")


class SignupModel(BaseModel):
    """Pydantic model for signup data."""

    name: str
    email: EmailStr
    password: str
    survey_data: list[dict[str, str]]


class LoginModel(BaseModel):
    """Pydantic model for login data."""

    email: EmailStr
    password: str


@router.post("/signup")
async def signup(
    request: Request,
    payload: SignupModel,
    bg_tasks: BackgroundTasks,
) -> JSONResponse:
    """Signup Endpoint."""
    bg_tasks.add_task(
        user_keyword_handler,
        payload.survey_data,
    )
    try:
        op = await create_user(payload.model_dump(exclude={"survey_data"}))
        print(op)
        request.session["user_id"] = str(op.id)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"message": "User created successfully."},
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST) from e


@router.post("/login")
async def login(
    request: Request,
    payload: LoginModel,
) -> JSONResponse:
    """Login Endpoint."""
    user = await get_user_by("email", payload.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )
    if not compare_passwords(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )
    request.session["user_id"] = str(user.id)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Login successful."},
    )
