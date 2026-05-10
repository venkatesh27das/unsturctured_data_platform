import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  path: string;
  icon: LucideIcon;
};

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";
