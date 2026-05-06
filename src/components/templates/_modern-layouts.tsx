"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { CompanyLogo, alpha, computeTotals, formatDate, money, safe, textOnColor } from "./_utils";

function docTypeLabel(type: InvoiceData["documentType"]) {
  return type.replaceAll("-", " ").toUpperCase();
}

type SharedProps = {
  data: InvoiceData;
  accent: string;
  showDenseHeader?: boolean;
};

export function ModernLayoutA({ data, accent, showDenseHeader = false }: SharedProps) {
  const totals = computeTotals(data);
  const onAccent = textOnColor(accent);

  return (
    <div
      data-invoice-frame
      className="invoice-a4 flex min-h-[297mm] flex-col bg-white text-[#111827]"
      style={{ width: "100%", maxWidth: "210mm", margin: "0 auto" }}
    >
      <div className="relative overflow-hidden px-[14mm] py-[10mm]" style={{ background: alpha(accent, 0.28) }}>
        <div
          className="absolute right-0 top-0 h-16 w-20"
          style={{ background: accent, clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        />
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[40px] font-extrabold uppercase leading-none">{docTypeLabel(data.documentType)}</h1>
          </div>
          <CompanyLogo data={data} fallback="LOGO" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 px-[14mm] py-4 text-[11px]">
        <Meta label="Number" value={safe(data.invoiceNumber)} />
        <Meta label="Date" value={formatDate(data.issueDate)} />
        <Meta label="Due" value={formatDate(data.dueDate)} />
        <Meta label="Amount Due" value={money(data, totals.balanceDue)} />
      </div>

      <div className="grid grid-cols-2 gap-6 px-[14mm] py-4" style={{ background: alpha(accent, 0.18) }}>
        <Party title="Bill To" name={data.toName} address={data.toAddress} phone={data.toPhone} email={data.toEmail} />
        <Party title="Bill From" name={data.companyName || data.fromName} address={data.fromAddress} phone={data.fromPhone} email={data.fromEmail} />
      </div>

      <div className="px-[14mm] pt-5">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="py-2 text-left text-[16px] font-bold uppercase">Description</th>
              <th className="py-2 text-right text-[16px] font-bold uppercase">Price</th>
              <th className="py-2 text-right text-[16px] font-bold uppercase">Qty.</th>
              <th className="py-2 text-right text-[16px] font-bold uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-[#e5e7eb]">
                <td className="py-2">{safe(item.description)}</td>
                <td className="py-2 text-right">{money(data, item.rate)}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">{money(data, item.quantity * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto px-[14mm] pb-3 pt-8">
        <div className={`ml-auto ${showDenseHeader ? "w-[42%]" : "w-[38%]"} text-[12px]`}>
          <SummaryRow label="SUBTOTAL" value={money(data, totals.subtotal)} />
          {totals.tax > 0 && <SummaryRow label={(data.taxLabel || "TAX").toUpperCase()} value={money(data, totals.tax)} />}
          <div className="mt-2 flex items-center justify-between rounded px-3 py-2 font-extrabold" style={{ background: accent, color: onAccent }}>
            <span>GRAND TOTAL</span>
            <span>{money(data, totals.total)}</span>
          </div>
        </div>
      </div>

      <footer className="mt-3 px-[14mm] py-4 text-[11px]" style={{ background: alpha(accent, 0.22) }}>
        <h3 className="mb-1 font-bold uppercase">Terms & Conditions</h3>
        <p className="whitespace-pre-line text-[#1f2937]">{safe(data.terms)}</p>
      </footer>
    </div>
  );
}

export function ModernLayoutB({ data, accent }: SharedProps) {
  const totals = computeTotals(data);
  const onAccent = textOnColor(accent);

  return (
    <div
      data-invoice-frame
      className="invoice-a4 flex min-h-[297mm] flex-col bg-white text-[#111827]"
      style={{ width: "100%", maxWidth: "210mm", margin: "0 auto" }}
    >
      <div className="relative px-[14mm] py-[10mm]" style={{ background: alpha(accent, 0.24) }}>
        <div
          className="absolute left-0 top-0 h-16 w-20"
          style={{ background: accent, clipPath: "polygon(0 0, 0 100%, 100% 0)" }}
        />
        <div className="flex items-center justify-between">
          <h1 className="text-[36px] font-extrabold uppercase">{docTypeLabel(data.documentType)}</h1>
          <CompanyLogo data={data} fallback="BUSINESS" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 px-[14mm] py-5 text-[11px]">
        <div>
          <p className="font-bold uppercase">Bill From</p>
          <p>{safe(data.companyName || data.fromName)}</p>
          <p>{safe(data.fromAddress)}</p>
          <p>{safe(data.fromEmail)}</p>
          <p>{safe(data.fromPhone)}</p>
        </div>
        <div>
          <p className="font-bold uppercase">Bill To</p>
          <p>{safe(data.toName)}</p>
          <p>{safe(data.toAddress)}</p>
          <p>{safe(data.toEmail)}</p>
          <p>{safe(data.toPhone)}</p>
        </div>
      </div>

      <div className="px-[14mm] text-[11px]">
        <div className="mb-3 grid grid-cols-[1fr_80px_80px] border-b border-[#6b7280] pb-2">
          <span className="text-[16px] font-bold uppercase">Service</span>
          <span className="text-right text-[16px] font-bold uppercase">Qnty.</span>
          <span className="text-right text-[16px] font-bold uppercase">Price</span>
        </div>
        {data.items.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_80px_80px] py-2">
            <span>{safe(item.description)}</span>
            <span className="text-right">{item.quantity}</span>
            <span className="text-right">{money(data, item.quantity * item.rate)}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto px-[14mm] pb-3 pt-8 text-[12px]">
        <div className="ml-auto w-[36%]">
          <SummaryRow label="SUBTOTAL" value={money(data, totals.subtotal)} />
          {totals.tax > 0 && <SummaryRow label={(data.taxLabel || "TAX").toUpperCase()} value={money(data, totals.tax)} />}
          <div className="mt-2 flex items-center justify-between rounded px-3 py-2 font-extrabold" style={{ background: accent, color: onAccent }}>
            <span>GRAND TOTAL</span>
            <span>{money(data, totals.total)}</span>
          </div>
        </div>
      </div>

      <footer className="mt-3 px-[14mm] py-4 text-[11px]" style={{ background: alpha(accent, 0.22) }}>
        <h3 className="mb-1 font-bold uppercase">Terms & Conditions</h3>
        <p className="whitespace-pre-line text-[#1f2937]">{safe(data.terms)}</p>
      </footer>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase text-[#4b5563]">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

function Party({
  title,
  name,
  address,
  phone,
  email,
}: {
  title: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}) {
  return (
    <div className="text-[11px]">
      <p className="mb-1 font-bold uppercase">{title}</p>
      <p className="font-semibold">{safe(name)}</p>
      <p>{safe(address)}</p>
      <p>{safe(phone)}</p>
      <p>{safe(email)}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-semibold">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

