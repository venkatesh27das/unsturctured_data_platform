from fastapi import APIRouter

from backend.schemas.platform import DashboardResponse
from backend.services.platform_service import get_dashboard

router = APIRouter()


@router.get("", response_model=DashboardResponse)
def read_dashboard():
    return get_dashboard()
