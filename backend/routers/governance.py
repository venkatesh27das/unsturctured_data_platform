from fastapi import APIRouter

from backend.schemas.platform import GovernanceResponse
from backend.services.platform_service import get_governance

router = APIRouter()


@router.get("", response_model=GovernanceResponse)
def read_governance():
    return get_governance()
