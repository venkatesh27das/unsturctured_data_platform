import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Database,
  FileWarning,
  Gauge,
  KeyRound,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  Siren
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge, Card, SectionTitle } from "../components/ui";
import { governanceFallback } from "../mockFallbacks";
import { useApi } from "../hooks/useApi";

const operationalSignals = [
  { label: "Pipeline SLA", value: "99.2%", detail: "42 active pipelines", icon: Activity, tone: "success" as const },
  { label: "Freshness Breaches", value: "3", detail: "2 email, 1 SFTP", icon: Clock3, tone: "warning" as const },
  { label: "Quality Gate Failures", value: "27", detail: "CPT and PA fields", icon: FileWarning, tone: "warning" as const },
  { label: "Retrieval p95", value: "184ms", detail: "hybrid search", icon: Gauge, tone: "success" as const }
];

const incidents = [
  { id: "INC-1042", area: "Ingestion", severity: "Medium", status: "Open", owner: "Data Engineering", summary: "Email connector lag exceeded 30 min watermark SLA" },
  { id: "INC-1039", area: "Quality", severity: "High", status: "Investigating", owner: "AI Platform", summary: "Prior auth extraction confidence dropped below 88% threshold" },
  { id: "INC-1031", area: "Access", severity: "Low", status: "Resolved", owner: "Governance", summary: "Blocked raw PHI export for contractor role" }
];

const controls = [
  { control: "RBAC by domain and role", scope: "Catalog assets, assistant sessions", status: "Enforced", evidence: "128 active policies" },
  { control: "ABAC sensitivity labels", scope: "PHI, confidential, internal", status: "Enforced", evidence: "8.7M protected records" },
  { control: "Citation requirement", scope: "Assistant answers", status: "Enforced", evidence: "99.1% cited responses" },
  { control: "Human review threshold", scope: "Low-confidence extraction", status: "Active", evidence: "27 queued records" }
];

const aiQuality = [
  { metric: "Grounded answer rate", value: "96.4%", status: "Healthy" },
  { metric: "Citation coverage", value: "99.1%", status: "Healthy" },
  { metric: "Retrieval precision", value: "91.8%", status: "Watch" },
  { metric: "Policy violation rate", value: "0.07%", status: "Healthy" }
];

export default function Governance() {
  const { data } = useApi("/api/governance", governanceFallback);
  return (
    <div className="space-y-5">
      <Card className="p-0">
        <div className="grid grid-cols-1 border-b border-slate-200 lg:grid-cols-[1fr_420px]">
          <div className="p-4">
            <SectionTitle eyebrow="Trust & Operations" title="Reliability, Controls and AI Answer Quality" />
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Monitor data pipeline health, quality gates, access controls, audit evidence, and RAG behavior from one operating surface.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 border-t border-slate-200 bg-slate-50 p-4 text-center text-xs lg:border-l lg:border-t-0">
            {[
              ["96", "Trust score", ShieldCheck],
              ["3", "Open incidents", Siren],
              ["99.1%", "Citations", ScanSearch],
              ["0", "Critical risk", LockKeyhole]
            ].map(([value, label, Icon]) => (
              <div key={label as string} className="rounded-lg bg-white p-3">
                <Icon className="mx-auto mb-1 text-orange-600" size={16} />
                <b className="block text-base text-charcoal">{value as string}</b>
                <span className="font-semibold text-slate-500">{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {operationalSignals.map((signal) => {
          const Icon = signal.icon;
          return (
            <Card key={signal.label}>
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600"><Icon size={19} /></div>
                <Badge tone={signal.tone}>{signal.tone === "success" ? "Healthy" : "Watch"}</Badge>
              </div>
              <p className="metric mt-3 text-xl font-semibold text-charcoal">{signal.value}</p>
              <p className="text-sm font-semibold text-slate-600">{signal.label}</p>
              <p className="mt-1 text-xs text-slate-500">{signal.detail}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <Card>
          <SectionTitle eyebrow="Operational Health" title="Freshness, Confidence and Failure Trend" />
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trend}>
                <defs>
                  <linearGradient id="confidenceArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="freshnessArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.14} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="#e7edf5" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="confidence" stroke="#ea580c" fill="url(#confidenceArea)" strokeWidth={3} />
                <Area type="monotone" dataKey="freshness" stroke="#10b981" fill="url(#freshnessArea)" strokeWidth={2} />
                <Area type="monotone" dataKey="failed" stroke="#ef4444" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle title="AI Quality Guardrails" />
          <div className="mt-4 space-y-3">
            {aiQuality.map((item) => (
              <div key={item.metric} className="rounded-lg bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-charcoal">{item.metric}</p>
                  <Badge tone={item.status === "Healthy" ? "success" : "warning"}>{item.status}</Badge>
                </div>
                <p className="metric mt-1 text-lg font-semibold text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <SectionTitle eyebrow="Incident Queue" title="Operational Exceptions" />
          <table className="enterprise-table mt-4">
            <thead>
              <tr>{["Incident", "Area", "Severity", "Status", "Owner"].map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id}>
                  <td>{incident.id}</td>
                  <td>{incident.area}</td>
                  <td><Badge tone={incident.severity === "High" ? "danger" : incident.severity === "Medium" ? "warning" : "neutral"}>{incident.severity}</Badge></td>
                  <td>{incident.status}</td>
                  <td>{incident.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 space-y-2">
            {incidents.map((incident) => (
              <p key={incident.summary} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                <AlertTriangle className="mr-2 inline text-amber-600" size={15} />
                <b>{incident.id}</b> {incident.summary}
              </p>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Control Posture" title="Policy Enforcement and Evidence" />
          <div className="mt-4 space-y-3">
            {controls.map((control) => (
              <div key={control.control} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-charcoal">{control.control}</p>
                    <p className="mt-1 text-sm text-slate-500">{control.scope}</p>
                  </div>
                  <Badge tone="success">{control.status}</Badge>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{control.evidence}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Audit Evidence" title="Recent Access and Assistant Events" />
        <table className="enterprise-table mt-4">
          <thead>
            <tr>{["Timestamp", "Actor", "Event", "Asset", "Decision", "Risk"].map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {data.logs.map((log) => (
              <tr key={log.timestamp}>
                <td>{log.timestamp}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.asset}</td>
                <td><Badge tone={log.result === "Denied" ? "danger" : "success"}>{log.result}</Badge></td>
                <td>{log.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            ["Data lineage", "Source, transformation, retrieval, and citation IDs retained", Database],
            ["Access proof", "RBAC, ABAC, masking, and export decisions logged", KeyRound],
            ["Audit ready", "Evidence packs can be generated for compliance review", CheckCircle2]
          ].map(([title, detail, Icon]) => (
            <div key={title as string} className="rounded-lg bg-slate-50 p-3">
              <Icon className="mb-2 text-orange-600" size={18} />
              <p className="font-semibold text-charcoal">{title as string}</p>
              <p className="mt-1 text-sm text-slate-600">{detail as string}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
