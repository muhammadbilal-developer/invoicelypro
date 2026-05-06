"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { ModernLayoutB } from "./_modern-layouts";

export function RetailTemplate({ data }: { data: InvoiceData }) {
  return <ModernLayoutB data={data} accent={data.brandColor} theme="grid" />;
}

export default RetailTemplate;

