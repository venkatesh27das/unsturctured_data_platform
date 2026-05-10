from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import assistant, catalog, dashboard, documents, governance, ingestion, knowledge, observability

app = FastAPI(title="Unstructured Data Intelligence Platform API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(ingestion.router, prefix="/api/ingestion", tags=["ingestion"])
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(knowledge.router, prefix="/api/knowledge", tags=["knowledge"])
app.include_router(catalog.router, prefix="/api/catalog", tags=["catalog"])
app.include_router(assistant.router, prefix="/api/assistant", tags=["assistant"])
app.include_router(governance.router, prefix="/api/governance", tags=["governance"])
app.include_router(observability.router, prefix="/api/observability", tags=["observability"])


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "unstructured-data-intelligence-platform"}
