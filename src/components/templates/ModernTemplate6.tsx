"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { ModernLayoutA } from "./_modern-layouts";

export function ModernTemplate6({ data }: { data: InvoiceData }) {
  return <ModernLayoutA data={data} accent={data.brandColor} />;
}

export default ModernTemplate6;

