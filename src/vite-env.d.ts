/// <reference types="vite/client" />

declare module "react-router-dom" {
  import type { ComponentType, ReactNode } from "react";

  export const BrowserRouter: ComponentType<{ children?: ReactNode }>;
  export const Routes: ComponentType<{ children?: ReactNode }>;
  export const Route: ComponentType<{ path?: string; element?: ReactNode }>;
  export const Navigate: ComponentType<{ to: string; replace?: boolean }>;
  export const Link: ComponentType<{ to: string; className?: string; children?: ReactNode }>;
  export const NavLink: ComponentType<{
    to: string;
    className?: string | ((state: { isActive: boolean }) => string);
    children?: ReactNode;
  }>;
}
