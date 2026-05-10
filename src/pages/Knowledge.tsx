import { Badge, Card, ProgressBar, SectionTitle } from "../components/ui";
import { knowledgeFallback } from "../mockFallbacks";
import { useApi } from "../hooks/useApi";

export default function Knowledge() {
  const { data } = useApi("/api/knowledge", knowledgeFallback);
  const nodes = [
    ["Claim", "50%", "18%"], ["Patient", "24%", "38%"], ["Provider", "74%", "35%"],
    ["Drug", "48%", "50%"], ["Diagnosis", "28%", "68%"], ["Policy", "74%", "66%"], ["Denial Reason", "50%", "82%"]
  ];
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr_360px]">
      <Card>
        <SectionTitle title="Semantic Assets" />
        <div className="mt-5 space-y-3">
          {["Claims Ontology", "Policy Taxonomy", "Drug Classifier", "ICD/CPT Mapper", "PHI Sensitivity Model"].map((asset) => <div key={asset} className="rounded-2xl bg-slate-50 p-4 font-bold">{asset}<p className="text-xs font-semibold text-orange-600">Active</p></div>)}
        </div>
      </Card>
      <div className="space-y-6">
        <Card className="min-h-[520px]">
          <SectionTitle eyebrow="Knowledge graph" title="Claims, Policy, Provider and Drug Relationships" />
          <div className="relative mt-6 h-[420px] overflow-hidden rounded-2xl bg-slate-950">
            <svg className="absolute inset-0 h-full w-full">
              {[[50,18,24,38],[50,18,74,35],[50,18,48,50],[48,50,28,68],[48,50,74,66],[74,66,50,82],[24,38,50,82]].map((l, i) => <line key={i} x1={`${l[0]}%`} y1={`${l[1]}%`} x2={`${l[2]}%`} y2={`${l[3]}%`} stroke="#fb923c" strokeOpacity=".45" strokeWidth="2" />)}
            </svg>
            {nodes.map(([name, left, top]) => <div className="graph-node" style={{ left, top }} key={name}>{name}</div>)}
          </div>
        </Card>
        <Card>
          <SectionTitle title="Lineage Timeline" />
          <div className="mt-5 grid grid-cols-5 gap-3">
            {["Source Document", "Processing", "Metadata", "Vector Index", "AI Consumption"].map((step) => <div key={step} className="rounded-2xl bg-orange-50 p-4 text-center text-sm font-bold text-orange-800">{step}</div>)}
          </div>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <SectionTitle title="Metadata Details" />
          <div className="mt-4 space-y-3 text-sm">
            {["Document: DENIAL-CLM-20491.pdf", "Business: Oncology reimbursement", "Semantic: denial_reason.missing_pa", "Lineage: certified", "Sensitivity: PHI Restricted"].map((item) => <p key={item} className="rounded-xl bg-slate-50 p-3 font-semibold">{item}</p>)}
          </div>
        </Card>
        <Card>
          <SectionTitle title="Semantic Chunks" />
          <div className="mt-4 space-y-3">{data.chunks.map((chunk) => <div key={chunk.id} className="rounded-2xl bg-slate-50 p-4"><div className="flex justify-between"><b>{chunk.id}</b><Badge tone="info">{chunk.similarity}</Badge></div><p className="mt-2 text-sm text-slate-600">{chunk.text}</p><ProgressBar value={chunk.confidence} /></div>)}</div>
        </Card>
        <Card>
          <SectionTitle title="Vector Index Status" />
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3"><b>{data.vector.embeddings.toLocaleString()}</b><p>Embeddings</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><b>{data.vector.freshness}</b><p>Freshness</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><b>{data.vector.retrievalHealth}%</b><p>Retrieval</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><b>{data.vector.chunkCount.toLocaleString()}</b><p>Chunks</p></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
