"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { ModernLayoutA } from "./_modern-layouts";

export function AgencyTemplate({ data }: { data: InvoiceData }) {
  return <ModernLayoutA data={data} accent={data.brandColor} theme="edge" />;
}

export default AgencyTemplate;

