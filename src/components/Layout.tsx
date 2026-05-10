import { NavLink } from "react-router-dom";
import {
  Bot,
  Boxes,
  ChartNoAxesCombined,
  Menu,
  Search,
  ShieldCheck,
  Workflow
} from "lucide-react";
import { useState } from "react";
import type { NavItem } from "../types";
import { cn } from "../lib/utils";

const nav: NavItem[] = [
  { title: "Dashboard", path: "/", icon: ChartNoAxesCombined },
  { title: "Data Catalog", path: "/catalog", icon: Boxes },
  { title: "Enterprise Assistant", path: "/assistant", icon: Bot },
  { title: "Trust & Operations", path: "/governance", icon: ShieldCheck }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800">
      <aside className={cn("fixed inset-y-0 left-0 z-20 flex flex-col bg-slate-950 text-slate-200 shadow-card transition-all", collapsed ? "w-[72px]" : "w-64")}>
        <div className="flex h-16 items-center gap-3 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-gradient text-white shadow-orange">
            <Workflow size={19} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold leading-tight text-white">Unstructured Data Platform</p>
              <p className="text-xs font-medium text-slate-400">Enterprise AI operations</p>
            </div>
          )}
        </div>
        <button className="mx-4 mb-3 flex h-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:bg-slate-900 hover:text-white" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle navigation">
          <Menu size={18} />
        </button>
        <nav className="flex-1 space-y-1 px-2">
          {nav.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive ? "bg-white/10 text-white shadow-inner-soft" : "text-slate-400 hover:bg-white/5 hover:text-white",
                  collapsed && "justify-center px-2"
                )
              }
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>
        {!collapsed && (
          <div className="m-3 rounded-lg bg-white/5 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active workspace</p>
            <p className="mt-1 text-sm font-semibold text-white">Prior Authorization Intelligence</p>
          </div>
        )}
      </aside>
      <main className={cn("transition-all", collapsed ? "pl-[72px]" : "pl-64")}>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-[#f8f9fa]/90 px-6 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Enterprise control plane</p>
            <h1 className="text-xl font-semibold text-charcoal">Unstructured Data Intelligence Platform</h1>
          </div>
          <div className="flex w-[420px] items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-soft">
            <Search size={18} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search assets, claims, policies, semantic chunks..." />
          </div>
        </header>
        <div className="p-5">{children}</div>
      </main>
    </div>
  );
}
