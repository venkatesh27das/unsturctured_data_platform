from fastapi import APIRouter

from backend.schemas.platform import DocumentsResponse
from backend.services.platform_service import get_documents

router = APIRouter()


@router.get("", response_model=DocumentsResponse)
def read_documents():
    return get_documents()
