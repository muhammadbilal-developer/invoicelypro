"use client";

import { DownloadButtons } from "@/components/generator/DownloadButtons";
import { InvoiceForm } from "@/components/generator/InvoiceForm";
import { InvoicePreview } from "@/components/generator/InvoicePreview";

export function InvoiceGeneratorApp() {
  return (
    <section id="generator" className="container-shell py-20 md:py-28">
      <div className="mb-6">
        <h2 className="text-3xl font-bold md:text-5xl">Live Invoice Generator</h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          Build, preview, and export professional invoices instantly.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[45%_55%]">
        <div className="min-w-0">
          <InvoiceForm />
          <DownloadButtons />
        </div>
        <div className="min-w-0">
          <InvoicePreview />
        </div>
      </div>
    </section>
  );
}
