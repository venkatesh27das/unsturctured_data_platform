import { AlertTriangle, ChevronLeft, ChevronRight, Eye, FileText, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Badge, Card, ProgressBar, SectionTitle } from "../components/ui";
import { documentsFallback } from "../mockFallbacks";
import { useApi } from "../hooks/useApi";

export default function Documents() {
  const { data } = useApi("/api/documents", documentsFallback);
  const [tab, setTab] = useState("Extracted Fields");
  const tabs = ["Extracted Fields", "Entities", "OCR Output", "Tables", "Review Queue"];
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(520px,1fr)_520px]">
      <Card className="min-h-[760px]">
        <div className="flex items-center justify-between">
          <SectionTitle eyebrow="Document viewer" title="DENIAL-CLM-20491.pdf" />
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-slate-200 p-2"><ChevronLeft size={18} /></button>
            <span className="text-sm font-bold">Page 2 of 8</span>
            <button className="rounded-xl border border-slate-200 p-2"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-slate-100 p-6">
          <div className="relative mx-auto min-h-[640px] max-w-3xl rounded-xl bg-white p-10 shadow-card">
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <div><p className="text-xs font-bold text-slate-500">PAYER DENIAL NOTICE</p><h3 className="text-xl font-bold">Prior Authorization Determination</h3></div>
              <FileText className="text-orange-600" />
            </div>
            <p className="leading-8 text-slate-700">Claim <mark className="rounded bg-orange-100 px-1">CLM-20491</mark> submitted by <mark className="rounded bg-sky-100 px-1">Northstar Oncology Group</mark> for <mark className="rounded bg-orange-100 px-1">Keytruda</mark> infusion therapy has been denied.</p>
            <p className="mt-5 leading-8 text-slate-700">The member record <mark className="rounded bg-rose-100 px-1">MBR-889204</mark> indicates diagnosis <mark className="rounded bg-emerald-100 px-1">C34.90 metastatic NSCLC</mark>. Prior authorization was not present at time of adjudication.</p>
            <div className="mt-8 rounded-xl border border-slate-200">
              <div className="grid grid-cols-3 bg-slate-50 text-xs font-bold uppercase text-slate-500"><span className="p-3">Service</span><span className="p-3">Code</span><span className="p-3">Result</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="p-3">Infusion</span><span className="p-3 bg-orange-50">96413</span><span className="p-3 text-rose-700">Denied</span></div>
            </div>
            <div className="absolute left-[15%] top-[39%] rounded-lg border-2 border-orange-400 px-24 py-5" />
            <div className="absolute right-[10%] top-[47%] rounded-lg border-2 border-rose-400 px-20 py-5" />
            <div className="absolute bottom-8 left-10 flex gap-2">
              <Badge tone="warning">Field Highlight</Badge><Badge tone="danger">PHI Region</Badge><Badge tone="info">Table Region</Badge>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <SectionTitle eyebrow="Extraction intelligence" title="AI Document Understanding" />
        <div className="mt-5 flex flex-wrap gap-2">{tabs.map((name) => <button key={name} className={`tab ${tab === name ? "active" : ""}`} onClick={() => setTab(name)}>{name}</button>)}</div>
        {tab === "Extracted Fields" && (
          <div className="mt-5 space-y-4">
            {data.fields.map(([label, value, confidence]) => (
              <div key={label as string} className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-2 flex justify-between"><span className="text-sm font-bold text-slate-500">{label}</span><span className="font-bold text-charcoal">{value}</span></div>
                <ProgressBar value={confidence as number} tone={(confidence as number) < 88 ? "red" : "orange"} />
                <p className="mt-1 text-right text-xs font-bold text-slate-500">{confidence}% confidence</p>
              </div>
            ))}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800"><AlertTriangle className="mr-2 inline" size={16} /> CPT Code and Prior Auth Status recommended for human review.</div>
          </div>
        )}
        {tab === "Entities" && <div className="mt-5 grid grid-cols-2 gap-3">{data.entities.map((entity) => <div className="rounded-2xl bg-slate-50 p-4" key={entity}><Eye className="mb-3 text-orange-600" size={18} /><p className="font-bold">{entity}</p><p className="text-sm text-slate-500">Detected and normalized</p></div>)}</div>}
        {tab === "OCR Output" && <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-orange-100">DENIAL REASON: Prior authorization not on file{"\n"}MEMBER: MBR-889204{"\n"}DRUG: Keytruda{"\n"}DIAGNOSIS: Metastatic NSCLC</pre>}
        {tab === "Tables" && <div className="mt-5 rounded-2xl border border-slate-200 p-4 text-sm">Detected service line table with 3 columns, 1 low-confidence CPT cell, and payer result normalization.</div>}
        {tab === "Review Queue" && <div className="mt-5 space-y-3">{data.reviewQueue.map((item) => <div key={item.doc} className="rounded-2xl bg-slate-50 p-4"><div className="flex justify-between"><b>{item.doc}</b><Badge tone="warning">{item.status}</Badge></div><p className="text-sm text-slate-600">Reviewer: {item.reviewer} · {item.reason}</p></div>)}</div>}
        <div className="mt-6 rounded-2xl bg-rose-50 p-4">
          <p className="font-bold text-rose-800"><ShieldAlert className="mr-2 inline" size={18} /> PHI/PII Detection</p>
          <div className="mt-3 flex flex-wrap gap-2">{["SSN", "Member ID", "Address", "DOB", "Phone Number"].map((x) => <Badge key={x} tone="danger">{x}</Badge>)}</div>
        </div>
      </Card>
    </div>
  );
}
