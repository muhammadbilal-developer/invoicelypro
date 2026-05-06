"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { ModernLayoutA } from "./_modern-layouts";

export function DefaultTemplate({ data }: { data: InvoiceData }) {
  return <ModernLayoutA data={data} accent={data.brandColor} showDenseHeader />;
}

export default DefaultTemplate;

