"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { TemplateFrame } from "./_TemplateFrame";
import { ItemsTable, Logo, NoteBlock, TotalsBlock } from "./_blocks";

export function FreelancerInvoice({ data }: { data: InvoiceData }) {
  return (
    <TemplateFrame brandColor={data.brandColor}>
      <header className="mb-6 flex items-start justify-between">
        <Logo data={data} fallbackText="InvoicelyPro" showInvoiceNumber={false} />
        <div className="text-right">
          <div className="inline-block rounded-full bg-[var(--bc-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--bc)]">
            Freelance Invoice
          </div>
          <div className="mt-2 font-mono text-[12px] font-semibold">{data.invoiceNumber}</div>
          <div className="text-[10px] text-[#4b5563]">{data.issueDate} · Due {data.dueDate}</div>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="text-[22px] font-semibold">Invoice for {(data as unknown as { fromName?: string }).fromName || "—"} — {data.invoiceNumber}</h2>
        <div className="mt-2 h-[2px] w-full bg-gradient-to-r from-[var(--bc)] to-transparent" />
      </section>

      <section className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border-l-4 border-[var(--bc)] bg-[var(--bc-soft)] p-4 text-[10px]">
          <div className="font-semibold">From</div>
          <div>{(data as unknown as { fromName?: string }).fromName || "—"}</div>
          <div>{(data as unknown as { fromAddress?: string }).fromAddress || "—"}</div>
          <div>{(data as unknown as { fromEmail?: string }).fromEmail || "—"}</div>
        </div>
        <div className="rounded-lg border-l-4 border-[var(--bc)] bg-[var(--bc-soft)] p-4 text-[10px]">
          <div className="font-semibold">To</div>
          <div>{(data as unknown as { toName?: string }).toName || "—"}</div>
          <div>{(data as unknown as { toAddress?: string }).toAddress || "—"}</div>
          <div>{(data as unknown as { toEmail?: string }).toEmail || "—"}</div>
        </div>
      </section>

      <section className="mb-5 rounded-md border border-[#e5e7eb] p-3 text-[10px]">
        Project / Period / Rate
      </section>

      <ItemsTable data={data} items={data.items} columns={["sl", "description", "qty", "price", "total"]} variant="accent-header" />
      <section className="mt-4 flex justify-end">
        <TotalsBlock data={data} className="w-1/2" />
      </section>

      <section className="mt-6 text-[10px]">
        <h4 className="mb-1 text-[11px] font-bold uppercase" style={{ color: "var(--bc)" }}>
          Terms & Conditions
        </h4>
        <div className="w-full rounded-md bg-[#f8fafc] p-3 whitespace-pre-line break-words">
          {data.terms || "—"}
        </div>
      </section>

      <NoteBlock>NOTE: This is a computer generated receipt and does not require physical signature.</NoteBlock>
    </TemplateFrame>
  );
}

export default FreelancerInvoice;
