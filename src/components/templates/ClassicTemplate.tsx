"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { ModernLayoutB } from "./_modern-layouts";

export function ClassicTemplate({ data }: { data: InvoiceData }) {
  return <ModernLayoutB data={data} accent={data.brandColor} />;
}

export default ClassicTemplate;

