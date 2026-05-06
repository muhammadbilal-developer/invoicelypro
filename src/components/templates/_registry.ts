import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { InvoiceData } from "@/lib/invoice-store";

export type TemplateMeta = {
  id: string;
  name: string;
  defaultColor: string;
  thumb: string;
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
  thumb: `/templates/thumbs/${id}.png`,
  Component: dynamic(() => loader().then((m) => m[exportName])),
});

export const TEMPLATE_LIST: TemplateMeta[] = [
  t("technology-template", "Modern Template A", "#2563EB", () => import("./TechnologyTemplate"), "TechnologyTemplate"),
  t("retail-template", "Modern Template B", "#0EA5E9", () => import("./RetailTemplate"), "RetailTemplate"),
  t("agency-template", "Modern Template C", "#4F46E5", () => import("./AgencyTemplate"), "AgencyTemplate"),
];

export const TEMPLATES: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATE_LIST.map((tpl) => [tpl.id, tpl]),
);
