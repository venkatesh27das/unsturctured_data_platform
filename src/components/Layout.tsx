import { NavLink } from "react-router-dom";
import {
  Bot,
  Boxes,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Search,
  Settings,
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
      <aside className={cn("fixed inset-y-0 left-0 z-20 flex flex-col border-r border-slate-200 bg-[#f1f2f4] text-slate-700 shadow-[2px_0_10px_rgba(15,23,42,0.03)] transition-all", collapsed ? "w-[72px]" : "w-64")}>
        <button
          className="absolute -right-3 top-6 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-soft transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        <div className={cn("flex h-16 items-center gap-3 border-b border-slate-200 px-4", collapsed && "justify-center px-3")}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-gradient text-white shadow-orange">
            <Workflow size={19} />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight text-charcoal">Unstructured Data Platform</p>
              <p className="text-xs font-medium text-orange-700">Enterprise AI operations</p>
            </div>
          )}
        </div>
        <nav className="flex-1 space-y-2 px-2.5 pt-6">
          {nav.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive ? "bg-orange-50 text-orange-700 shadow-soft" : "text-slate-600 hover:bg-white hover:text-charcoal",
                  collapsed && "justify-center px-2",
                  isActive && "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-orange-600"
                )
              }
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <div className={cn("rounded-lg bg-white p-2.5 shadow-soft", collapsed && "p-2")}>
          <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-gradient text-xs font-bold text-white shadow-orange">
              VD
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-charcoal">Venkatesh Das</p>
                  <p className="truncate text-xs font-medium text-slate-500">Platform owner</p>
                </div>
                <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-orange-50 hover:text-orange-700" aria-label="Profile settings">
                  <Settings size={16} />
                </button>
              </>
            )}
          </div>
          </div>
        </div>
      </aside>
      <main className={cn("transition-all", collapsed ? "pl-[72px]" : "pl-64")}>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-[#f8f9fa]/90 px-6 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">Enterprise control plane</p>
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
