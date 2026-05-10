from fastapi import APIRouter

from backend.schemas.platform import IngestionResponse
from backend.services.platform_service import get_ingestion

router = APIRouter()


@router.get("", response_model=IngestionResponse)
def read_ingestion():
    return get_ingestion()
