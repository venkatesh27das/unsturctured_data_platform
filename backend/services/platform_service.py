from backend.repositories import mock_repository


def get_dashboard():
    return mock_repository.dashboard


def get_ingestion():
    return mock_repository.ingestion


def get_documents():
    return mock_repository.documents


def get_knowledge():
    return mock_repository.knowledge


def get_catalog():
    return mock_repository.catalog


def get_assistant():
    return mock_repository.assistant


def get_governance():
    return mock_repository.governance


def get_observability():
    return mock_repository.observability
