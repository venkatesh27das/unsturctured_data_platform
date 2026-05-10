from fastapi import APIRouter

from backend.schemas.platform import ObservabilityResponse
from backend.services.platform_service import get_observability

router = APIRouter()


@router.get("", response_model=ObservabilityResponse)
def read_observability():
    return get_observability()
