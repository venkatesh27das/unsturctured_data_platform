import {
  BrainCircuit,
  CheckCircle2,
  Database,
  FileSearch,
  Layers3,
  LockKeyhole,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, ProgressBar } from "../components/ui";
import { assistantFallback } from "../mockFallbacks";
import { useApi } from "../hooks/useApi";

const evidenceTabs = ["Evidence", "Citations", "Governance"] as const;

export default function Assistant() {
  const { data } = useApi("/api/assistant", assistantFallback);
  const assistantData = "dataProducts" in data ? data : assistantFallback;
  const [usecase, setUsecase] = useState("oncology prior authorization leakage");
  const [evidenceTab, setEvidenceTab] = useState<(typeof evidenceTabs)[number]>("Evidence");
  const [selectedStores, setSelectedStores] = useState(() =>
    assistantFallback.stores.filter((store) => store.status === "Attached").map((store) => store.name)
  );

  const activeStores = assistantData.stores.filter((store) => selectedStores.includes(store.name));
  const activeStoreNames = activeStores.map((store) => store.name);
  const activeLayers = assistantData.knowledgeLayers.filter((layer) => layer.status === "Attached");
  const activeChunks = useMemo(() => {
    const scopedChunks = assistantData.chunks.filter((chunk) => activeStoreNames.includes(chunk.source));
    return scopedChunks.length > 0 ? scopedChunks : assistantData.chunks;
  }, [activeStoreNames, assistantData.chunks]);
  const matchedProducts = useMemo(() => {
    const query = usecase.trim().toLowerCase();
    if (!query) return assistantData.dataProducts;
    return assistantData.dataProducts.filter((product) =>
      [product.name, product.usecase, product.owner, product.knowledge, product.sensitivity, ...product.stores]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [assistantData.dataProducts, usecase]);

  const toggleStore = (storeName: string) => {
    setSelectedStores((current) =>
      current.includes(storeName) ? current.filter((name) => name !== storeName) : [...current, storeName]
    );
  };

  return (
    <div className="premium-panel assistant-body flex h-[calc(100vh-6.5rem)] min-h-[680px] flex-col overflow-hidden rounded-lg bg-white">
      <div className="flex shrink-0 flex-col gap-2 bg-slate-50 px-3.5 py-2.5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-orange-600">Enterprise Assistant</p>
          <h2 className="text-base font-semibold text-charcoal">Governed RAG Workspace</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={activeStores.length > 0 ? "success" : "warning"}>{activeStores.length} stores scoped</Badge>
          <Badge tone="neutral">{activeLayers.length} knowledge layer</Badge>
          <Badge tone="info">{activeChunks.length} evidence chunks</Badge>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-soft transition hover:bg-slate-100">
            <SlidersHorizontal size={15} />
            Hybrid retrieval
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[330px_minmax(420px,1fr)_360px]">
        <aside className="flex min-h-0 flex-col bg-slate-50 xl:border-r xl:border-slate-100">
          <div className="shrink-0 p-2.5">
            <div className="flex h-9 items-center gap-2 rounded-lg bg-white px-2.5 shadow-soft">
              <Search size={16} className="text-slate-400" />
              <input
                value={usecase}
                onChange={(event) => setUsecase(event.target.value)}
                className="w-full bg-transparent text-[13px] font-semibold outline-none placeholder:text-slate-400"
                placeholder="Search use case or data product"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Data Products</p>
                <Badge tone="info">{matchedProducts.length}</Badge>
              </div>
              <div className="space-y-2">
                {matchedProducts.map((product, index) => (
                  <button
                    key={product.name}
                    className={`w-full rounded-lg border p-2.5 text-left transition ${
                      index === 0 ? "border-orange-200 bg-orange-50 shadow-soft" : "border-transparent bg-white shadow-soft hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-semibold text-charcoal">{product.name}</p>
                      <Badge tone={product.sensitivity.includes("PHI") ? "danger" : "neutral"}>{product.sensitivity}</Badge>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-orange-600">{product.usecase}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{product.owner}</span>
                      <span>{product.score}% quality</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Retrieval Scope</p>
              <div className="space-y-2">
                {assistantData.stores.map((store) => {
                  const isSelected = selectedStores.includes(store.name);
                  return (
                    <label
                      key={store.name}
                      className={`block cursor-pointer rounded-lg border p-2.5 transition ${
                        isSelected ? "border-slate-200 bg-emerald-50 shadow-soft" : "border-transparent bg-white shadow-soft hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleStore(store.name)}
                          className="mt-1 h-4 w-4 accent-orange-600"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-[13px] font-semibold text-charcoal">{store.name}</p>
                            <Badge tone={store.type === "Vector store" ? "info" : "neutral"}>{store.type}</Badge>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{store.records} • {store.freshness}</p>
                          <div className="mt-2">
                            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-500"><span>Retrieval</span><span>{store.retrieval}%</span></div>
                            <ProgressBar value={store.retrieval} tone={isSelected ? "green" : "orange"} />
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Knowledge Layer</p>
              <div className="space-y-2">
                {assistantData.knowledgeLayers.map((layer) => (
                  <div key={layer.name} className="rounded-lg bg-white p-2.5 shadow-soft">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-semibold text-charcoal">{layer.name}</p>
                      <Badge tone={layer.status === "Attached" ? "success" : "neutral"}>{layer.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{layer.coverage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex min-h-0 flex-col bg-white">
          <div className="shrink-0 border-b border-slate-100 p-2.5">
            <div className="flex flex-wrap gap-2">
              {activeStores.map((store) => <Badge key={store.name} tone={store.type === "Vector store" ? "info" : "success"}>{store.name}</Badge>)}
              {activeLayers.map((layer) => <Badge key={layer.name} tone="neutral">{layer.name}</Badge>)}
              {activeStores.length === 0 && <Badge tone="warning">No retrieval sources selected</Badge>}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-3">
            <div className="mx-auto max-w-3xl space-y-3">
              {assistantData.conversation.map((message) => (
                <div key={message.text} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={message.role === "user" ? "max-w-[78%] rounded-lg bg-orange-gradient px-3 py-2.5 text-white shadow-orange" : "max-w-[84%] rounded-lg bg-white px-3 py-2.5 text-slate-800 shadow-soft"}>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70">{message.role === "user" ? "Analyst" : "Grounded AI"}</p>
                    <p className="mt-1.5 text-[13px] leading-5">{message.text}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-lg bg-white p-3 shadow-soft">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-charcoal">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  Answer trace is ready for review
                </div>
                <div className="mt-2.5 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-slate-50 p-2.5"><b className="metric block text-[13px] text-charcoal">0.94</b><span className="text-slate-500">Top score</span></div>
                  <div className="rounded-lg bg-slate-50 p-2.5"><b className="block text-[13px] text-charcoal">Low</b><span className="text-slate-500">AI risk</span></div>
                  <div className="rounded-lg bg-slate-50 p-2.5"><b className="metric block text-[13px] text-charcoal">3</b><span className="text-slate-500">Citations</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-100 bg-white p-2.5">
            <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-lg bg-slate-50 p-2 shadow-soft">
              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-soft" aria-label="Attach context">
                <Paperclip size={16} />
              </button>
              <textarea className="max-h-24 min-h-8 flex-1 resize-none bg-transparent text-[13px] outline-none placeholder:text-slate-400" placeholder="Ask across the selected governed sources..." />
              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-gradient text-white shadow-orange" aria-label="Send message">
                <Send size={16} />
              </button>
            </div>
          </div>
        </main>

        <aside className="flex min-h-0 flex-col border-t border-slate-100 bg-white xl:border-l xl:border-t-0">
          <div className="shrink-0 border-b border-slate-100 px-3 py-2">
            <div className="grid grid-cols-3">
              {evidenceTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setEvidenceTab(tab)}
                  className={`border-b-2 px-2 py-1.5 text-xs font-semibold transition ${evidenceTab === tab ? "border-orange-600 text-charcoal" : "border-transparent text-slate-500 hover:text-charcoal"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
            {evidenceTab === "Evidence" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-slate-50 p-2.5"><Database className="mb-1.5 text-orange-600" size={16} /><b className="metric">{activeStores.length}</b><p className="text-xs text-slate-500">Stores</p></div>
                  <div className="rounded-lg bg-slate-50 p-2.5"><Layers3 className="mb-1.5 text-orange-600" size={16} /><b className="metric">{activeChunks.length}</b><p className="text-xs text-slate-500">Chunks</p></div>
                  <div className="rounded-lg bg-slate-50 p-2.5"><BrainCircuit className="mb-1.5 text-indigo-600" size={16} /><b className="metric">{activeLayers.length}</b><p className="text-xs text-slate-500">Layers</p></div>
                  <div className="rounded-lg bg-slate-50 p-2.5"><ShieldCheck className="mb-1.5 text-emerald-600" size={16} /><b>Low</b><p className="text-xs text-slate-500">Risk</p></div>
                </div>
                {activeChunks.map((chunk) => (
                  <div key={chunk.id} className="border-b border-slate-100 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between gap-2"><b className="metric text-[13px] text-charcoal">{chunk.id}</b><Badge tone="info">{chunk.score}</Badge></div>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">{chunk.source}</p>
                    <p className="mt-1.5 text-[13px] leading-5 text-slate-600">{chunk.text}</p>
                  </div>
                ))}
              </div>
            )}

            {evidenceTab === "Citations" && (
              <div className="space-y-3">
                {assistantData.citations.map((citation) => (
                  <div key={citation} className="border-b border-slate-100 pb-3 last:border-b-0">
                    <div className="flex items-start gap-2">
                      <FileSearch size={17} className="mt-0.5 text-orange-600" />
                      <div>
                        <b className="text-[13px] text-charcoal">{citation}</b>
                        <p className="mt-1 text-[13px] text-slate-500">Available for answer trace, lineage, and access audit.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {evidenceTab === "Governance" && (
              <div className="space-y-3">
                {assistantData.ragStrategy.map((step, index) => (
                  <div key={step.step} className="border-b border-slate-100 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-50 text-xs font-bold text-orange-700">{index + 1}</span>
                        <b className="text-[13px] text-charcoal">{step.step}</b>
                      </div>
                      <Badge tone="success">{step.metric}</Badge>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-5 text-slate-600">{step.detail}</p>
                  </div>
                ))}
                <div className="rounded-lg bg-emerald-50 p-2.5 text-[13px] font-semibold text-emerald-800">
                  <LockKeyhole className="mr-2 inline" size={15} />
                  PHI masking, RBAC, and citation checks are enabled for this session.
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
