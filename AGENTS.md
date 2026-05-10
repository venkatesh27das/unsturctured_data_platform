# AI Handoff

This repository is an enterprise unstructured data and AI operations platform prototype. Future Codex sessions should use this file as the working context before making changes.

## Product Intent

The app should feel like a premium enterprise AI platform, not a demo template. It is a control plane for operationalizing unstructured data into governed AI experiences.

Primary product areas:

- **Dashboard**: executive and operator cockpit for platform readiness, lifecycle health, assistant demand, open exceptions, and workspace entry points.
- **Data Catalog**: governed operating model for assets, sources, pipelines, extraction jobs, quality validation, AI enablement, lineage, and access.
- **Enterprise Assistant**: three-pane governed RAG workspace with data-product search and retrieval scope on the left, chat in the center, and evidence/citations/governance on the right.
- **Trust & Operations**: reliability, incidents, controls, audit evidence, policy enforcement, and AI answer quality.

## UX Direction

- Keep the top-level navigation intentionally small: Dashboard, Data Catalog, Enterprise Assistant, Trust & Operations.
- Do not reintroduce separate top-level tabs for ingestion, processing, extraction, knowledge graph, or enterprise search. Those belong inside Data Catalog or Enterprise Assistant.
- Avoid “demo app” language in the UI.
- Favor dense, enterprise-grade workflows over marketing-style pages.
- Use the off-white app canvas and white elevated panels to preserve background-to-foreground hierarchy.
- Use subtle shadows instead of heavy gray borders.
- Keep cards to an 8px radius unless a component has a clear reason otherwise.
- Prefer scannable tables, compact panels, and clear operating states.
- Use muted, modern status pills with color-matched text.
- Use tabular/monospace styling for metrics, scores, latency, and percentages.
- Keep the Assistant workspace compact. Its body scale is intentionally smaller than the rest of the app; avoid increasing chat/evidence/card padding unless there is a clear usability reason.
- The sidebar should feel like a dedicated but integrated control panel: light gray tint, subtle right border/shadow, strong active state, and a profile footer.
- The collapse affordance belongs on the sidebar/main-content boundary as a small circular chevron, not as a standalone hamburger-style nav button.

## Current Visual System

- Main app background: very light gray/off-white.
- Main surfaces: white elevated panels using `premium-panel` or `shadow-soft`.
- Sidebar: integrated light gray panel with a subtle right border and faint side shadow.
- Sidebar active state: pale orange background, orange text/icon, and a left orange indicator rail.
- Sidebar footer: profile/account area with initials avatar, name, role, and settings affordance. Do not restore the old “Active workspace” footer block.
- Accent: orange/gold brand system, exposed through the existing `orange-*` Tailwind theme aliases for compatibility.
- User/analyst chat bubble: orange-to-gold gradient. AI responses stay neutral white/elevated.
- Semantic colors: keep green for success/safety and red/rose for PHI or high-risk warnings.
- Charts: smooth monotone lines, subtle gradient fills, light horizontal gridlines.
- Tables: `enterprise-table` provides zebra striping and hover emphasis.
- Evidence panel tabs: underline-style active state with orange indicator, not pill buttons.

## Screen State

Data Catalog now behaves as a workflow screen, not a static report:

- The header includes a lifecycle strip from source registration through retrieval enablement.
- Assets are selectable and drive the right-side operational metadata panel.
- Sources & Pipelines includes selectable connectors, source contract onboarding, preflight validation, and source-to-landing run status.
- Extraction Jobs includes stage progress, extraction run selection, field review actions, review queue, and entity normalization.
- Quality & Validation includes selectable validation rules, exception triage, quarantine/assignment actions, validation summary, and quality gates.
- AI Enablement includes selectable retrieval assets, graph context, retrieval build steps, vector index health, semantic chunks, and publish-to-assistant action.
- Lineage & Access includes source-to-assistant lineage, access policy selection, policy decision details, and audit readiness.

## Frontend Notes

Stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide icons

Important files:

- `src/components/Layout.tsx`: top-level shell and navigation.
- `src/components/ui.tsx`: shared `Card`, `Badge`, `SectionTitle`, `ProgressBar`.
- `src/styles.css`: global theme, table styling, typography, elevation.
- `src/pages/Dashboard.tsx`: platform cockpit.
- `src/pages/Catalog.tsx`: full Data Catalog operating model.
- `src/pages/Assistant.tsx`: governed RAG workspace.
- `src/pages/Governance.tsx`: Trust & Operations.
- `src/mockFallbacks.ts`: frontend fallback data.
- `src/api.ts`: reads `VITE_API_BASE`; empty means same-origin.

Routing:

- `/` -> Dashboard
- `/catalog` -> Data Catalog
- `/assistant` -> Enterprise Assistant
- `/governance` -> Trust & Operations
- Legacy paths `/ingestion`, `/documents`, `/knowledge`, `/enterprise-search` redirect into the new IA.

## Backend Notes

Stack:

- FastAPI
- Pydantic
- Uvicorn

Important files:

- `main.py`: FastAPI app, CORS, router registration.
- `backend/repositories/mock_repository.py`: mock API payloads.
- `backend/services/platform_service.py`: service accessors.
- `backend/routers/*.py`: route modules.
- `backend/schemas/platform.py`: response schemas.

The backend is currently a mock API supporting the UI prototype. Keep frontend fallback data and backend mock data reasonably aligned when changing payloads.

## Repo Standards

- Keep generated files out of git: `node_modules/`, `dist/`, `__pycache__/`, `.DS_Store`, `*.tsbuildinfo`.
- Update `README.md` when setup, architecture, or product areas change materially.
- Preserve `.env.example` when adding new env vars.
- Prefer focused changes that improve the enterprise operating model.
- Do not add new dependencies unless they clearly improve the product or implementation.
- Do not introduce broad refactors unrelated to the requested product change.

## Verification

Before handing work back, run:

```bash
npm run build
python3 -m compileall main.py backend
```

Known acceptable build note:

- Vite may warn that some chunks are larger than 500 kB after minification. This is currently expected for the prototype.

## Local Development

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Optional frontend env:

```bash
VITE_API_BASE=http://localhost:8000
```
