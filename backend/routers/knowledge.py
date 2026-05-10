from fastapi import APIRouter

from backend.schemas.platform import KnowledgeResponse
from backend.services.platform_service import get_knowledge

router = APIRouter()


@router.get("", response_model=KnowledgeResponse)
def read_knowledge():
    return get_knowledge()
