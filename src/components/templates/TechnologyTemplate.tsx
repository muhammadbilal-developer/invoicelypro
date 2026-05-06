"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { CompanyLogo, alpha, computeTotals, formatDate, getPageMeta, money, safe, textOnColor } from "./_utils";

export function TechnologyTemplate({ data }: { data: InvoiceData }) {
  const accent = data.brandColor;
  const onAccent = textOnColor(accent);
  const totals = computeTotals(data);
  const page = getPageMeta(data);

  return (
    <div
      data-invoice-frame
      className="invoice-a4 flex min-h-[297mm] flex-col bg-white text-[#111827]"
      style={{ width: "100%", maxWidth: "210mm", margin: "0 auto" }}
    >
      <header className="relative px-[14mm] py-[10mm]" style={{ background: "#0F172A", color: "#E5E7EB" }}>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#94A3B8]">Document</p>
            <h1 className="mt-1 text-[30px] font-extrabold uppercase">{data.documentType.replaceAll("-", " ")}</h1>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#cbd5e1]">{safe(data.companyName || data.fromName)}</p>
          </div>
          <CompanyLogo data={data} fallback="MODERN" />
        </div>
      </header>
      <div className="h-5" />

      <section className="grid grid-cols-[1.2fr_1fr] gap-5 px-[14mm] py-5 text-[11px]">
        <div className="rounded-lg border border-[#e5e7eb] p-3">
          <p className="text-[10px] font-bold uppercase text-[#64748B]">From</p>
          <p className="mt-1 font-semibold">{safe(data.companyName || data.fromName)}</p>
          <p>{safe(data.fromAddress)}</p>
          <p>{safe(data.fromEmail)}</p>
          <p>{safe(data.fromPhone)}</p>
        </div>
        <div className="space-y-2 rounded-lg p-3" style={{ background: alpha(accent, 0.12) }}>
          <Meta label="Invoice #" value={safe(data.invoiceNumber)} />
          <Meta label="Issue Date" value={formatDate(data.issueDate)} />
          <Meta label="Due Date" value={formatDate(data.dueDate)} />
          <Meta label="Bill To" value={safe(data.toName)} />
        </div>
      </section>
      <div className="h-4" />

      <section className="px-[14mm]">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr style={{ background: alpha(accent, 0.14) }}>
              <th className="px-2 py-2 text-left text-[14px] font-bold uppercase">Item</th>
              <th className="px-2 py-2 text-right text-[14px] font-bold uppercase">Qty</th>
              <th className="px-2 py-2 text-right text-[14px] font-bold uppercase">Rate</th>
              <th className="px-2 py-2 text-right text-[14px] font-bold uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-[#e5e7eb]">
                <td className="px-2 py-2">{safe(item.description)}</td>
                <td className="px-2 py-2 text-right">{item.quantity}</td>
                <td className="px-2 py-2 text-right">{money(data, item.rate)}</td>
                <td className="px-2 py-2 text-right">{money(data, item.quantity * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-[100px] px-[14mm] pb-3 text-[12px]">
        <div className="ml-auto w-[40%]">
          {page.showTotals ? (
            <>
              <Row label="SUBTOTAL" value={money(data, totals.subtotal)} />
              {totals.tax > 0 ? <Row label={(data.taxLabel || "TAX").toUpperCase()} value={money(data, totals.tax)} /> : null}
              <div className="mt-2 flex items-center justify-between rounded px-3 py-2 font-extrabold" style={{ background: accent, color: onAccent }}>
                <span>GRAND TOTAL</span>
                <span>{money(data, totals.total)}</span>
              </div>
            </>
          ) : (
            <div className="text-right text-[10px] text-[#6b7280]">Continued on next page</div>
          )}
        </div>
      </div>
      <div className="flex-1" />

      <footer className="mt-3 px-[14mm] py-4 text-[11px]" style={{ background: "#F8FAFC" }}>
        <h3 className="mb-1 font-bold uppercase">Terms & Conditions</h3>
        <p className="whitespace-pre-line text-[#334155]">{safe(data.terms)}</p>
        {page.pageCount > 1 ? <p className="mt-2 text-right text-[10px]">Page {page.pageNumber} of {page.pageCount}</p> : null}
      </footer>
    </div>
  );
}

export default TechnologyTemplate;

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] font-semibold uppercase text-[#475569]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-semibold">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

