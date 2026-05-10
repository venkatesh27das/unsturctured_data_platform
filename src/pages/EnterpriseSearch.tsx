import { ArrowRight, BrainCircuit, Database, FileSearch, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, ProgressBar, SectionTitle } from "../components/ui";
import { useApi } from "../hooks/useApi";
import { assistantFallback } from "../mockFallbacks";

export default function EnterpriseSearch() {
  const { data } = useApi("/api/assistant", assistantFallback);
  const searchData = "dataProducts" in data ? data : assistantFallback;
  const [usecase, setUsecase] = useState("oncology prior authorization leakage");

  const matchedProducts = useMemo(() => {
    const query = usecase.trim().toLowerCase();
    if (!query) return searchData.dataProducts;
    return searchData.dataProducts.filter((product) =>
      [product.name, product.usecase, product.owner, product.knowledge, product.sensitivity, ...product.stores]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [searchData.dataProducts, usecase]);

  const bestMatch = matchedProducts[0] ?? searchData.dataProducts[0];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6">
            <SectionTitle eyebrow="Enterprise Search" title="Find Governed Data Products by Use Case" />
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Search across certified data products, vector stores, metadata stores, and knowledge layers before deciding what should power an assistant session.
            </p>
            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <div className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
                <Search size={18} className="shrink-0 text-slate-400" />
                <input
                  value={usecase}
                  onChange={(event) => setUsecase(event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                  placeholder="Enter use case name"
                />
              </div>
              <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-orange-gradient px-5 text-sm font-bold text-white shadow-orange">
                <FileSearch size={18} />
                Search enterprise
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {searchData.usecaseSuggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => setUsecase(suggestion)} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700">
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-50 p-6 lg:border-l lg:border-t-0">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-600">Best match</p>
                  <h3 className="mt-2 text-xl font-bold text-charcoal">{bestMatch.name}</h3>
                </div>
                <Badge tone={bestMatch.sensitivity.includes("PHI") ? "warning" : "neutral"}>{bestMatch.sensitivity}</Badge>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-xl bg-slate-50 p-3"><b>{bestMatch.score}%</b><p className="text-xs text-slate-500">Score</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><b>{bestMatch.freshness}</b><p className="text-xs text-slate-500">Fresh</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><b>{bestMatch.stores.length}</b><p className="text-xs text-slate-500">Stores</p></div>
              </div>
              <Link to="/assistant" className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-100">
                Open in Enterprise Assistant
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        <Card>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <SectionTitle title="Data Product Results" />
            <Badge tone="info">{matchedProducts.length} matched</Badge>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {matchedProducts.map((product) => (
              <div key={product.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-charcoal">{product.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-orange-600">{product.usecase}</p>
                  </div>
                  <Badge tone={product.sensitivity.includes("PHI") ? "warning" : "neutral"}>{product.sensitivity}</Badge>
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-600">{product.owner}</p>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs font-bold text-slate-500"><span>Quality score</span><span>{product.score}%</span></div>
                  <ProgressBar value={product.score} tone="green" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.stores.map((store) => <Badge key={store} tone="info">{store}</Badge>)}
                </div>
                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-charcoal"><BrainCircuit size={16} /> {product.knowledge}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">Freshness {product.freshness}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <SectionTitle title="Search Scope" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4"><Database className="text-orange-600" size={20} /><b className="mt-3 block text-2xl">{searchData.stores.length}</b><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Stores</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><BrainCircuit className="text-sky-600" size={20} /><b className="mt-3 block text-2xl">{searchData.knowledgeLayers.length}</b><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Layers</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><ShieldCheck className="text-emerald-600" size={20} /><b className="mt-3 block text-2xl">100%</b><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Governed</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><FileSearch className="text-indigo-600" size={20} /><b className="mt-3 block text-2xl">{searchData.dataProducts.length}</b><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Products</p></div>
            </div>
          </Card>
          <Card>
            <SectionTitle title="Available Stores" />
            <div className="mt-5 space-y-3">
              {searchData.stores.map((store) => (
                <div key={store.name} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <b className="text-sm text-charcoal">{store.name}</b>
                    <Badge tone={store.type === "Vector store" ? "info" : "neutral"}>{store.type}</Badge>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{store.records} • {store.freshness}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
