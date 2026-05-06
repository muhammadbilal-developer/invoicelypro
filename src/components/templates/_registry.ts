import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { InvoiceData } from "@/lib/invoice-store";

export type TemplateMeta = {
  id: string;
  name: string;
  defaultColor: string;
  Component: ComponentType<{ data: InvoiceData }>;
};

const t = (
  id: string,
  name: string,
  defaultColor: string,
  loader: () => Promise<{ [key: string]: ComponentType<{ data: InvoiceData }> }>,
  exportName: string,
): TemplateMeta => ({
  id,
  name,
  defaultColor,
  Component: dynamic(() => loader().then((m) => m[exportName])),
});

export const TEMPLATE_LIST: TemplateMeta[] = [
  t("default-template", "Default Template", "#B7DED7", () => import("./DefaultTemplate"), "DefaultTemplate"),
  t("classic-template", "Classic Template", "#7786A2", () => import("./ClassicTemplate"), "ClassicTemplate"),
  t("minimal-template", "Minimal Template", "#1C3557", () => import("./MinimalTemplate"), "MinimalTemplate"),
  t("modern-template-4", "Modern Template 4", "#2563EB", () => import("./ModernTemplate4"), "ModernTemplate4"),
  t("modern-template-5", "Modern Template 5", "#0F766E", () => import("./ModernTemplate5"), "ModernTemplate5"),
  t("modern-template-6", "Modern Template 6", "#7C3AED", () => import("./ModernTemplate6"), "ModernTemplate6"),
  t("modern-template-7", "Modern Template 7", "#EA580C", () => import("./ModernTemplate7"), "ModernTemplate7"),
  t("modern-template-8", "Modern Template 8", "#0891B2", () => import("./ModernTemplate8"), "ModernTemplate8"),
  t("modern-template-9", "Modern Template 9", "#334155", () => import("./ModernTemplate9"), "ModernTemplate9"),
  t("modern-template-10", "Modern Template 10", "#BE185D", () => import("./ModernTemplate10"), "ModernTemplate10"),
];

export const TEMPLATES: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATE_LIST.map((tpl) => [tpl.id, tpl]),
);
