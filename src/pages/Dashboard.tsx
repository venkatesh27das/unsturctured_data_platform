import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  DatabaseZap,
  FileSearch,
  Gauge,
  GitBranch,
  Layers3,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge, Card, ProgressBar, SectionTitle } from "../components/ui";
import { useApi } from "../hooks/useApi";
import { dashboardFallback } from "../mockFallbacks";

const operatingMetrics = [
  { label: "Platform readiness", value: "96", detail: "catalog, pipelines, assistant, controls", icon: Gauge, tone: "success" as const },
  { label: "Certified data assets", value: "5", detail: "4 active, 1 verified", icon: Layers3, tone: "info" as const },
  { label: "Open exceptions", value: "3", detail: "2 operational, 1 quality", icon: AlertTriangle, tone: "warning" as const },
  { label: "AI answer trust", value: "96.4%", detail: "grounded response rate", icon: ShieldCheck, tone: "success" as const }
];

const lifecycle = [
  { stage: "Sources", status: "14 registered", score: 99, icon: DatabaseZap },
  { stage: "Pipelines", status: "42 active", score: 96, icon: GitBranch },
  { stage: "Quality", status: "27 failures", score: 94, icon: CheckCircle2 },
  { stage: "AI Enablement", status: "6 retrieval assets", score: 97, icon: Sparkles },
  { stage: "Assistant", status: "31.2K queries", score: 96, icon: Bot },
  { stage: "Controls", status: "128 policies", score: 99, icon: ShieldCheck }
];

const actionQueue = [
  { item: "Review prior-auth extraction confidence drop", owner: "AI Platform", severity: "High", route: "/catalog" },
  { item: "Resolve email connector freshness breach", owner: "Data Engineering", severity: "Medium", route: "/governance" },
  { item: "Promote policy corpus from verified to certified", owner: "Reimbursement Strategy", severity: "Low", route: "/catalog" }
];

const workspaces = [
  { title: "Data Catalog", body: "Register sources, certify assets, validate quality, and manage retrieval assets.", route: "/catalog", icon: Layers3 },
  { title: "Enterprise Assistant", body: "Ask governed questions across selected vector and metadata stores.", route: "/assistant", icon: Bot },
  { title: "Trust & Operations", body: "Monitor reliability, incidents, controls, AI quality, and audit evidence.", route: "/governance", icon: ShieldCheck }
];

export default function Dashboard() {
  const { data } = useApi("/api/dashboard", dashboardFallback);
  return (
    <div className="space-y-5">
      <Card className="p-0">
        <div className="grid grid-cols-1 border-b border-slate-200 lg:grid-cols-[1fr_360px]">
          <div className="p-4">
            <SectionTitle eyebrow="Dashboard" title="Enterprise Data and AI Control Plane" />
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              A single operating view for unstructured data readiness, pipeline health, governed assistant usage, and trust controls.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-200 bg-slate-50 p-4 text-center text-xs lg:border-l lg:border-t-0">
            <div className="rounded-lg bg-white p-3">
              <b className="block text-base text-charcoal">{data.health.activePipelines}</b>
              <span className="font-semibold text-slate-500">Pipelines</span>
            </div>
            <div className="rounded-lg bg-white p-3">
              <b className="block text-base text-charcoal">{data.health.avgConfidence}%</b>
              <span className="font-semibold text-slate-500">Confidence</span>
            </div>
            <div className="rounded-lg bg-white p-3">
              <b className="block text-base text-rose-600">{data.health.failedJobs}</b>
              <span className="font-semibold text-slate-500">Failures</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {operatingMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} hover>
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600"><Icon size={19} /></div>
                <Badge tone={metric.tone}>{metric.tone === "warning" ? "Needs review" : "On track"}</Badge>
              </div>
              <p className="metric mt-3 text-xl font-semibold text-charcoal">{metric.value}</p>
              <p className="text-sm font-semibold text-slate-600">{metric.label}</p>
              <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <SectionTitle eyebrow="Lifecycle Readiness" title="Source to Trusted Assistant Flow" />
          <Badge tone="success">End-to-end governed</Badge>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {lifecycle.map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.stage} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <Icon className="text-orange-600" size={18} />
                  <span className="metric text-xs font-semibold text-slate-500">{stage.score}%</span>
                </div>
                <p className="mt-3 font-semibold text-charcoal">{stage.stage}</p>
                <p className="mt-1 text-xs text-slate-500">{stage.status}</p>
                <div className="mt-3"><ProgressBar value={stage.score} tone={stage.score < 95 ? "orange" : "green"} /></div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
        <Card>
          <SectionTitle eyebrow="7 Day Operating Trend" title="Ingestion Volume, Successful Processing and Assistant Demand" />
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trends}>
                <defs>
                  <linearGradient id="blueArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="#e7edf5" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="ingestion" stroke="#2563eb" fill="url(#blueArea)" strokeWidth={3} />
                <Area type="monotone" dataKey="success" stroke="#10b981" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="queries" stroke="#0ea5e9" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Action Queue" title="Items Needing Attention" />
          <div className="mt-4 space-y-3">
            {actionQueue.map((action) => (
              <Link key={action.item} to={action.route} className="block rounded-lg border border-slate-200 bg-white p-3 transition hover:bg-slate-50">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-charcoal">{action.item}</p>
                  <Badge tone={action.severity === "High" ? "danger" : action.severity === "Medium" ? "warning" : "neutral"}>{action.severity}</Badge>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{action.owner}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_420px]">
        <Card>
          <SectionTitle eyebrow="Workspace Shortcuts" title="Continue Operating the Platform" />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {workspaces.map((workspace) => {
              const Icon = workspace.icon;
              return (
                <Link key={workspace.title} to={workspace.route} className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-orange-200 hover:bg-orange-50">
                  <div className="flex items-center justify-between">
                    <Icon className="text-orange-600" size={20} />
                    <ArrowRight className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-orange-700" size={17} />
                  </div>
                  <p className="mt-3 font-semibold text-charcoal">{workspace.title}</p>
                  <p className="mt-2 text-sm leading-5 text-slate-600">{workspace.body}</p>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Recent Platform Events" title="Latest Signals" />
          <div className="mt-4 space-y-3">
            {data.activity.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-3">
                <FileSearch className="mt-0.5 shrink-0 text-orange-600" size={17} />
                <p className="text-sm font-medium leading-5 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
