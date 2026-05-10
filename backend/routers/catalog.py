from fastapi import APIRouter

from backend.schemas.platform import CatalogResponse
from backend.services.platform_service import get_catalog

router = APIRouter()


@router.get("", response_model=CatalogResponse)
def read_catalog():
    return get_catalog()
