import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import type { StatusTone } from "../types";

export function Card({
  children,
  className,
  hover = false
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={cn(
        "premium-panel rounded-lg bg-white p-3.5",
        hover && "transition hover:-translate-y-0.5 hover:shadow-card",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ tone = "neutral", children }: { tone?: StatusTone; children: React.ReactNode }) {
  const tones: Record<StatusTone, string> = {
    success: "bg-emerald-50 text-emerald-800 ring-emerald-100",
    warning: "bg-amber-50 text-amber-800 ring-amber-100",
    danger: "bg-rose-50 text-rose-800 ring-rose-100",
    info: "bg-orange-50 text-orange-800 ring-orange-100",
    neutral: "bg-slate-100 text-slate-700 ring-slate-200"
  };
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1", tones[tone])}>{children}</span>;
}

export function SectionTitle({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-wider text-orange-600">{eyebrow}</p>}
      <h2 className="text-lg font-semibold text-charcoal">{title}</h2>
    </div>
  );
}

export function ProgressBar({ value, tone = "orange" }: { value: number; tone?: "orange" | "green" | "blue" | "red" }) {
  const colors = {
    orange: "bg-orange-500",
    green: "bg-emerald-500",
    blue: "bg-orange-500",
    red: "bg-rose-500"
  };
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className={cn("h-full rounded-full", colors[tone])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
