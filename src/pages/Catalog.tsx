import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  DatabaseZap,
  FileSearch,
  FileStack,
  Fingerprint,
  GitBranch,
  KeyRound,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud
} from "lucide-react";
import { useState } from "react";
import { Badge, Card, ProgressBar, SectionTitle } from "../components/ui";
import { catalogFallback, documentsFallback, ingestionFallback, knowledgeFallback } from "../mockFallbacks";
import { useApi } from "../hooks/useApi";

const qualityRules = [
  { rule: "Required metadata present", target: "99.5%", score: 98, failed: 42, owner: "Catalog Ops" },
  { rule: "Duplicate document detection", target: "< 0.5%", score: 96, failed: 391, owner: "Data Engineering" },
  { rule: "Extraction confidence threshold", target: ">= 90%", score: 94, failed: 27, owner: "AI Platform" },
  { rule: "PHI classification coverage", target: "100%", score: 99, failed: 8, owner: "Governance" }
];

const accessPolicies = [
  { policy: "PHI restricted claims", scope: "Oncology Claims Knowledge Index", roles: "Market Access, Compliance", result: "Conditional" },
  { policy: "Assistant retrieval guardrail", scope: "All vector stores", roles: "Approved AI users", result: "Enforced" },
  { policy: "Raw document export", scope: "Source files", roles: "Data stewards only", result: "Blocked by default" }
];

function AssetsTab() {
  const { data } = useApi("/api/catalog", catalogFallback);
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[260px_1fr_340px]">
      <Card className="bg-slate-50">
        <SectionTitle title="Asset Filters" />
        <div className="mt-4 space-y-4">
          {["Domain", "Asset type", "Sensitivity", "Owner", "Certification"].map((filter) => (
            <label key={filter} className="block">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-600"><SlidersHorizontal size={14} />{filter}</span>
              <select className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm shadow-soft">
                <option>All</option>
                <option>Oncology</option>
                <option>Claims</option>
                <option>Policy</option>
              </select>
            </label>
          ))}
        </div>
      </Card>

      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-soft">
          <Search className="text-orange-600" size={18} />
          <input className="w-full bg-transparent text-sm font-semibold outline-none" defaultValue="Find oncology reimbursement data assets" />
        </div>
        <Card className="p-0">
          <table className="enterprise-table overflow-hidden rounded-lg">
            <thead>
              <tr>{["Asset", "Owner", "Freshness", "Sensitivity", "Quality", "Lineage"].map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product.title}>
                  <td>{product.title}</td>
                  <td>{product.owner}</td>
                  <td>{product.freshness}</td>
                  <td><Badge tone={product.sensitivity.includes("PHI") ? "danger" : "neutral"}>{product.sensitivity}</Badge></td>
                  <td>{product.score}%</td>
                  <td><Badge tone={product.lineage === "Certified" ? "success" : "info"}>{product.lineage}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Selected Asset" title="Operational Metadata" />
        <div className="mt-4 space-y-3 text-sm">
          {[
            ["Business owner", "Market Access Analytics"],
            ["Technical owner", "Data Engineering"],
            ["Source systems", "SharePoint, SFTP, payer API"],
            ["Contract", "FHIR claim bundle + document evidence"],
            ["SLA", "15 min freshness, 99% quality gate"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
              <p className="mt-1 font-semibold text-charcoal">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SourcesTab() {
  const { data } = useApi("/api/ingestion", ingestionFallback);
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {data.connectors.slice(0, 4).map((source) => (
            <Card key={source.name} hover>
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600"><DatabaseZap size={19} /></div>
                <Badge tone={source.status === "Connected" ? "success" : source.status === "Degraded" ? "warning" : "neutral"}>{source.status}</Badge>
              </div>
              <p className="mt-3 font-semibold text-charcoal">{source.name}</p>
              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>Watermark: <b>{source.lastSync}</b></p>
                <p>Cadence: <b>{source.frequency}</b></p>
                <p>Volume: <b>{source.documents.toLocaleString()}</b></p>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <SectionTitle eyebrow="Pipeline Runs" title="Source-to-Landing Operations" />
          <table className="enterprise-table mt-4">
            <thead>
              <tr>{["Run", "Source", "Owner", "Records", "Status", "Watermark", "Preflight", "Last Run"].map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.source}</td>
                  <td>{job.owner}</td>
                  <td>{job.count.toLocaleString()}</td>
                  <td><Badge tone={job.status === "Completed" ? "success" : job.status === "Review" ? "warning" : "info"}>{job.status}</Badge></td>
                  <td>{job.freshness}</td>
                  <td>{job.validation}</td>
                  <td>{job.lastRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Onboard Source" title="Register Connector" />
        <div className="mt-4 rounded-lg border border-dashed border-orange-200 bg-orange-50 p-5 text-center">
          <UploadCloud className="mx-auto text-orange-600" size={28} />
          <p className="mt-2 font-semibold text-charcoal">Configure landing zone and contract</p>
          <p className="text-sm text-slate-600">Schema, watermark, cadence, owner, sensitivity</p>
        </div>
        <div className="mt-4 space-y-3">
          {["Business domain", "Source system", "Data contract", "Watermark column"].map((field) => (
            <input key={field} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder={field} />
          ))}
          <label className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm font-semibold">
            Run preflight validation <input type="checkbox" defaultChecked className="h-4 w-4 accent-orange-600" />
          </label>
        </div>
      </Card>
    </div>
  );
}

function ExtractionTab() {
  const { data } = useApi("/api/documents", documentsFallback);
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Extraction Jobs" title="Document Understanding Pipeline" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
            {["OCR", "Layout Parse", "Entity Extract", "Chunk & Embed"].map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-orange-700">{index + 1}</span>
                  <Badge tone="success">Passed</Badge>
                </div>
                <p className="mt-3 font-semibold text-charcoal">{step}</p>
                <p className="mt-1 text-sm text-slate-500">{96 - index}% confidence</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle title="Extracted Contract Fields" />
          <table className="enterprise-table mt-4">
            <thead>
              <tr>{["Field", "Value", "Confidence", "Action"].map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.fields.map(([label, value, confidence]) => (
                <tr key={label as string}>
                  <td>{label}</td>
                  <td>{value}</td>
                  <td>{confidence}%</td>
                  <td><Badge tone={(confidence as number) < 88 ? "warning" : "success"}>{(confidence as number) < 88 ? "Review" : "Accept"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div className="space-y-5">
        <Card>
          <SectionTitle title="Review Queue" />
          <div className="mt-4 space-y-3">
            {data.reviewQueue.map((item) => (
              <div key={item.doc} className="rounded-lg bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <b className="text-sm text-charcoal">{item.doc}</b>
                  <Badge tone="warning">{item.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.reason}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Reviewer: {item.reviewer}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle title="Entity Normalization" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {data.entities.map((entity) => (
              <div key={entity} className="rounded-lg bg-slate-50 p-3">
                <FileSearch className="mb-2 text-orange-600" size={17} />
                <p className="font-semibold">{entity}</p>
                <p className="text-xs text-slate-500">Mapped to canonical ID</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function QualityTab() {
  const { data } = useApi("/api/ingestion", ingestionFallback);
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
      <Card>
        <SectionTitle eyebrow="Data Quality" title="Validation Rules and Failing Records" />
        <table className="enterprise-table mt-4">
          <thead>
            <tr>{["Rule", "Target", "Score", "Failed", "Owner"].map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {qualityRules.map((rule) => (
              <tr key={rule.rule}>
                <td>{rule.rule}</td>
                <td>{rule.target}</td>
                <td>{rule.score}%</td>
                <td>{rule.failed}</td>
                <td>{rule.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="space-y-5">
        <Card>
          <SectionTitle title="Validation Summary" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(data.validation).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-slate-50 p-3">
                <p className="text-xl font-semibold text-charcoal">{value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle title="Quality Gate" />
          <div className="mt-4 space-y-3">
            {qualityRules.map((rule) => (
              <div key={rule.rule}>
                <div className="mb-1 flex justify-between text-xs font-bold text-slate-500"><span>{rule.rule}</span><span>{rule.score}%</span></div>
                <ProgressBar value={rule.score} tone={rule.score < 95 ? "orange" : "green"} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function EnablementTab() {
  const { data } = useApi("/api/knowledge", knowledgeFallback);
  const nodes = [
    ["Claim", "50%", "18%"], ["Patient", "24%", "38%"], ["Provider", "74%", "35%"],
    ["Drug", "48%", "50%"], ["Diagnosis", "28%", "68%"], ["Policy", "74%", "66%"], ["Denial Reason", "50%", "82%"]
  ];
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_1fr_340px]">
      <Card>
        <SectionTitle title="Retrieval Assets" />
        <div className="mt-4 space-y-3">
          {[
            ["Claims Vector Store", `${data.vector.chunkCount.toLocaleString()} chunks`, "Active"],
            ["Claims Metadata Store", "1.84M documents", "Active"],
            ["Claims Relationship Graph", "7 node types", "Active"],
            ["Oncology Access Ontology", "95% confidence", "Active"]
          ].map(([name, detail, status]) => (
            <div key={name} className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-2">
                <b className="text-sm text-charcoal">{name}</b>
                <Badge tone="success">{status}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">{detail}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Knowledge Graph" title="Claims, Policy, Provider and Drug Relationships" />
        <div className="relative mt-4 h-[380px] overflow-hidden rounded-lg bg-slate-950">
          <svg className="absolute inset-0 h-full w-full">
            {[[50,18,24,38],[50,18,74,35],[50,18,48,50],[48,50,28,68],[48,50,74,66],[74,66,50,82],[24,38,50,82]].map((l, i) => <line key={i} x1={`${l[0]}%`} y1={`${l[1]}%`} x2={`${l[2]}%`} y2={`${l[3]}%`} stroke="#38bdf8" strokeOpacity=".45" strokeWidth="2" />)}
          </svg>
          {nodes.map(([name, left, top]) => <div className="graph-node" style={{ left, top }} key={name}>{name}</div>)}
        </div>
      </Card>

      <div className="space-y-5">
        <Card>
          <SectionTitle title="Vector Index Health" />
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-slate-50 p-3"><b>{data.vector.embeddings.toLocaleString()}</b><p>Embeddings</p></div>
            <div className="rounded-lg bg-slate-50 p-3"><b>{data.vector.freshness}</b><p>Freshness</p></div>
            <div className="rounded-lg bg-slate-50 p-3"><b>{data.vector.retrievalHealth}%</b><p>Retrieval</p></div>
            <div className="rounded-lg bg-slate-50 p-3"><b>{data.vector.chunkCount.toLocaleString()}</b><p>Chunks</p></div>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Semantic Chunks" />
          <div className="mt-4 space-y-3">
            {data.chunks.map((chunk) => (
              <div key={chunk.id} className="rounded-lg bg-slate-50 p-3">
                <div className="flex justify-between"><b>{chunk.id}</b><Badge tone="info">{chunk.similarity}</Badge></div>
                <p className="mt-2 text-sm text-slate-600">{chunk.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function LineageTab() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      <Card>
        <SectionTitle eyebrow="Lineage" title="Source to AI Consumption Trace" />
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-6">
          {["Source", "Landing", "Extraction", "Quality Gate", "Vector Index", "Assistant"].map((step, index) => (
            <div key={step} className="relative rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
              <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-orange-700">{index + 1}</span>
              <p className="mt-2 text-sm font-semibold text-charcoal">{step}</p>
              <p className="mt-1 text-xs text-slate-500">Audited</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-charcoal">DENIAL-CLM-20491.pdf</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ingested from SharePoint, parsed into claim evidence fields, validated against confidence and PHI rules, embedded into the claims vector store, and cited by the assistant with access checks.
          </p>
        </div>
      </Card>

      <div className="space-y-5">
        <Card>
          <SectionTitle title="Access Policies" />
          <div className="mt-4 space-y-3">
            {accessPolicies.map((policy) => (
              <div key={policy.policy} className="rounded-lg bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <b className="text-sm text-charcoal">{policy.policy}</b>
                  <Badge tone={policy.result === "Enforced" ? "success" : policy.result === "Conditional" ? "warning" : "danger"}>{policy.result}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{policy.scope}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{policy.roles}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle title="Audit Readiness" />
          <div className="mt-4 space-y-3 text-sm">
            {["Column and document lineage captured", "RBAC and sensitivity labels inherited", "Assistant citations tied to asset versions", "Export controls enforced for PHI"].map((item) => (
              <p key={item} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 font-semibold text-slate-700"><CheckCircle2 size={16} className="text-emerald-600" />{item}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

const catalogTabs = [
  { key: "assets", label: "Assets", icon: Layers3, component: <AssetsTab /> },
  { key: "sources", label: "Sources & Pipelines", icon: DatabaseZap, component: <SourcesTab /> },
  { key: "extraction", label: "Extraction Jobs", icon: FileStack, component: <ExtractionTab /> },
  { key: "quality", label: "Quality & Validation", icon: ShieldCheck, component: <QualityTab /> },
  { key: "enablement", label: "AI Enablement", icon: BrainCircuit, component: <EnablementTab /> },
  { key: "lineage", label: "Lineage & Access", icon: GitBranch, component: <LineageTab /> }
];

export default function Catalog() {
  const [activeTab, setActiveTab] = useState(catalogTabs[0].key);
  const active = catalogTabs.find((tab) => tab.key === activeTab) ?? catalogTabs[0];

  return (
    <div className="space-y-5">
      <Card className="p-0">
        <div className="grid grid-cols-1 border-b border-slate-200 lg:grid-cols-[1fr_420px]">
          <div className="p-4">
            <SectionTitle eyebrow="Data Catalog" title="Governed Data Asset Operating Model" />
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Register sources, certify assets, validate quality, derive retrieval assets, and trace access from raw evidence to assistant answers.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 border-t border-slate-200 bg-slate-50 p-4 text-center text-xs lg:border-l lg:border-t-0">
            {[
              ["14", "Sources", DatabaseZap],
              ["5", "Certified", Fingerprint],
              ["97%", "Quality", Activity],
              ["3", "Policies", KeyRound]
            ].map(([value, label, Icon]) => (
              <div key={label as string} className="rounded-lg bg-white p-3">
                <Icon className="mx-auto mb-1 text-orange-600" size={16} />
                <b className="block text-base text-charcoal">{value as string}</b>
                <span className="font-semibold text-slate-500">{label as string}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-3">
          {catalogTabs.map((tab) => {
            const Icon = tab.icon;
            const selected = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  selected ? "bg-orange-50 text-orange-700 ring-1 ring-orange-100" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
          <div className="ml-auto hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 xl:flex">
            <Network size={15} />
            Data contracts, quality gates, lineage, access, and retrieval readiness
          </div>
        </div>
      </Card>
      {active.component}
    </div>
  );
}
