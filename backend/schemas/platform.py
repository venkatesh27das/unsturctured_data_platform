from pydantic import BaseModel


class Kpi(BaseModel):
    label: str
    value: str
    change: str | None = None


class DashboardResponse(BaseModel):
    kpis: list[Kpi]
    trends: list[dict]
    health: dict
    activity: list[str]


class IngestionResponse(BaseModel):
    connectors: list[dict]
    jobs: list[dict]
    validation: dict


class DocumentsResponse(BaseModel):
    fields: list[list]
    entities: list[str]
    reviewQueue: list[dict]


class KnowledgeResponse(BaseModel):
    chunks: list[dict]
    vector: dict


class CatalogResponse(BaseModel):
    products: list[dict]


class AssistantResponse(BaseModel):
    usecaseSuggestions: list[str]
    dataProducts: list[dict]
    stores: list[dict]
    knowledgeLayers: list[dict]
    ragStrategy: list[dict]
    conversation: list[dict]
    citations: list[str]
    chunks: list[dict]


class GovernanceResponse(BaseModel):
    kpis: list[Kpi]
    trend: list[dict]
    logs: list[dict]


class ObservabilityResponse(BaseModel):
    ai: dict
    pipelines: dict
