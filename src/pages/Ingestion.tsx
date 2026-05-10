import { Cloud, FileWarning, Mail, Network, Server, Share2, UploadCloud } from "lucide-react";
import { Badge, Card, SectionTitle } from "../components/ui";
import { ingestionFallback } from "../mockFallbacks";
import { useApi } from "../hooks/useApi";

const connectorIcons = [Share2, Server, Mail, Cloud, Network, FileWarning, FileWarning];

export default function Ingestion() {
  const { data } = useApi("/api/ingestion", ingestionFallback);
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.connectors.map((connector, index) => {
            const Icon = connectorIcons[index];
            const tone = connector.status === "Connected" ? "success" : connector.status === "Degraded" ? "warning" : "neutral";
            return (
              <Card key={connector.name} hover>
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl bg-orange-50 p-3 text-orange-600"><Icon size={22} /></div>
                  <Badge tone={tone}>{connector.status}</Badge>
                </div>
                <h3 className="mt-4 font-bold text-charcoal">{connector.name}</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p>Last sync: <b>{connector.lastSync}</b></p>
                  <p>Documents: <b>{connector.documents.toLocaleString()}</b></p>
                  <p>Frequency: <b>{connector.frequency}</b></p>
                </div>
              </Card>
            );
          })}
        </div>
        <Card>
          <SectionTitle eyebrow="Control tower" title="Ingestion Jobs" />
          <table className="enterprise-table mt-5">
            <thead><tr>{["Job ID","Source","Owner","Document Count","Status","Freshness","Validation Result","Last Run"].map((h)=><th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {data.jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td><td>{job.source}</td><td>{job.owner}</td><td>{job.count.toLocaleString()}</td>
                  <td><Badge tone={job.status === "Completed" ? "success" : job.status === "Review" ? "warning" : "info"}>{job.status}</Badge></td>
                  <td>{job.freshness}</td><td>{job.validation}</td><td>{job.lastRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <SectionTitle title="Upload & Configure" eyebrow="Source drawer" />
          <div className="mt-5 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 p-8 text-center">
            <UploadCloud className="mx-auto text-orange-600" size={34} />
            <p className="mt-3 font-bold text-charcoal">Drop prior auth packets or claims PDFs</p>
            <p className="text-sm text-slate-600">Multi-file upload with metadata capture</p>
          </div>
          <div className="mt-5 space-y-3">
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Business domain tag" />
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"><option>Oncology Market Access</option><option>Claims Operations</option></select>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm font-semibold">
              Auto-classification <input type="checkbox" defaultChecked className="h-5 w-5 accent-orange-600" />
            </label>
          </div>
        </Card>
        <Card>
          <SectionTitle title="File Validation" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(data.validation).map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-2xl font-bold text-charcoal">{value}</p>
                <p className="text-xs font-bold uppercase text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
