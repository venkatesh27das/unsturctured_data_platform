from fastapi import APIRouter

from backend.schemas.platform import AssistantResponse
from backend.services.platform_service import get_assistant

router = APIRouter()


@router.get("", response_model=AssistantResponse)
def read_assistant():
    return get_assistant()
