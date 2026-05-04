"use client";

import type { InvoiceData, LineItem } from "@/lib/invoice-store";
import { format } from "date-fns";

type Party = {
  name?: string;
  organization?: string;
  address?: string;
  email?: string;
  phone?: string;
  taxId?: string;
};

export function safe(value?: string) {
  return value && value.trim() ? value : "—";
}

export function formatDate(value?: string) {
  if (!value) return "—";
  try {
    return format(new Date(value), "dd/MM/yyyy");
  } catch {
    return value;
  }
}

export function money(data: InvoiceData, amount: number) {
  const symbol = (data as unknown as { currencySymbol?: string }).currencySymbol ?? "";
  return `${symbol}${amount.toFixed(2)}`;
}

export function Logo({
  data,
  fallbackText = "Invar",
  showInvoiceNumber = true,
}: {
  data: InvoiceData;
  fallbackText?: string;
  showInvoiceNumber?: boolean;
}) {
  return (
    <div>
      {data.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.logo} alt="logo" style={{ maxHeight: 40, maxWidth: 160 }} />
      ) : (
        <div className="text-[22px] font-extrabold tracking-tight">
          <span style={{ color: "var(--bc)" }}>{fallbackText[0]}</span>
          <span className="text-[#111827]">{fallbackText.slice(1)}</span>
        </div>
      )}
      {showInvoiceNumber ? (
        <div className="mt-2">
          <div className="text-[10px] uppercase tracking-wide text-[#6b7280]">Invoice No</div>
          <div className="text-[11px] font-semibold">{safe(data.invoiceNumber)}</div>
        </div>
      ) : null}
    </div>
  );
}

export function DocumentTitle({ text }: { text: string }) {
  const normalized = text.replaceAll("-", " ");
  return (
    <div
      className="max-w-[260px] text-left text-[24px] font-extrabold uppercase leading-tight tracking-[0.03em] break-words"
      style={{ color: "var(--bc)" }}
    >
      {normalized}
    </div>
  );
}

export function MetaRow({ label, value }: { label: string; value?: string }) {
  if (label.toLowerCase() === "invoice no") return null;
  const normalizedLabel = label.toLowerCase();
  const formattedValue = normalizedLabel === "date" || normalizedLabel === "due" ? formatDate(value) : safe(value);
  return (
    <div className="py-1 text-left text-[11px]">
      <span className="uppercase tracking-wide text-[#6b7280]">{label}</span>
      <span className="font-semibold"> : {formattedValue}</span>
    </div>
  );
}

export function PartyBlock({ title, party, align = "left" }: { title: string; party: Party; align?: "left" | "right" }) {
  return (
    <div style={{ textAlign: align }}>
      <div className="mb-1.5 text-[11px] font-bold uppercase" style={{ color: "var(--bc)" }}>
        {title}
      </div>
      <div className="text-[12px] font-semibold">{safe(party.name)}</div>
      <div className="whitespace-pre-line text-[10px] text-[#374151]">{safe(party.address)}</div>
      <div className="text-[10px] text-[#374151]">{safe(party.email)}</div>
      <div className="text-[10px] text-[#374151]">{safe(party.phone)}</div>
      {party.taxId ? <div className="text-[10px] text-[#374151]">Tax ID: {party.taxId}</div> : null}
    </div>
  );
}

export function ItemsTable({
  data,
  items,
  columns,
  variant = "filled",
}: {
  data: InvoiceData;
  items: LineItem[];
  columns: Array<"sl" | "description" | "price" | "qty" | "tax" | "total">;
  variant?: "filled" | "striped" | "outlined" | "accent-header";
}) {
  const headStyle =
    variant === "accent-header"
      ? { background: "var(--bc)", color: "white" }
      : variant === "filled"
        ? { background: "#F4F6FB" }
        : {};
  const chunks: LineItem[][] = [];
  for (let i = 0; i < items.length; i += 20) {
    chunks.push(items.slice(i, i + 20));
  }

  return (
    <div>
      {chunks.map((group, groupIndex) => (
        <div
          key={`chunk-${groupIndex}`}
          className={groupIndex > 0 ? "mt-8 border-t border-dashed border-[#d1d5db] pt-6" : ""}
          style={groupIndex > 0 ? ({ breakBefore: "page", pageBreakBefore: "always" } as { breakBefore: "page"; pageBreakBefore: "always" }) : undefined}
        >
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr style={headStyle}>
                {columns.map((col) => (
                  <th key={col} className={`px-2 py-2 text-left text-[10px] uppercase tracking-wide ${["price", "qty", "tax", "total"].includes(col) ? "text-right" : ""}`}>
                    {col === "sl" ? "SL" : col === "qty" ? "QTY" : col.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.map((item, idx) => {
                const absoluteIdx = groupIndex * 20 + idx;
                return (
                  <tr key={item.id} className={variant === "striped" && absoluteIdx % 2 ? "bg-[#f9fafb]" : ""} style={{ borderBottom: "1px solid #E5E7EB" }}>
                    {columns.includes("sl") ? <td className="px-2 py-2">{(item as { sl?: number | string }).sl ?? String(absoluteIdx + 1).padStart(2, "0")}</td> : null}
                    {columns.includes("description") ? <td className="px-2 py-2">{safe(item.description)}</td> : null}
                    {columns.includes("price") ? <td className="px-2 py-2 text-right font-mono">{money(data, item.rate)}</td> : null}
                    {columns.includes("qty") ? <td className="px-2 py-2 text-right">{item.quantity}</td> : null}
                    {columns.includes("tax") ? <td className="px-2 py-2 text-right">{item.taxPercent ?? 0}%</td> : null}
                    {columns.includes("total") ? <td className="px-2 py-2 text-right font-mono">{money(data, item.quantity * item.rate)}</td> : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export function TotalsBlock({ data, className = "" }: { data: InvoiceData; className?: string }) {
  const taxLabel = (data as unknown as { taxLabel?: string }).taxLabel || "Tax";
  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const tax =
    data.taxMode === "percent" ? (subtotal * data.taxValue) / 100 : data.taxMode === "flat" ? data.taxValue : 0;
  const discount =
    data.discountMode === "percent"
      ? (subtotal * data.discountValue) / 100
      : data.discountMode === "flat"
        ? data.discountValue
        : 0;
  const total = subtotal + tax + data.shippingValue - discount;
  const balance = total - data.amountPaid;

  return (
    <div className={`text-[11px] ${className}`}>
      <Row label="Sub Total" value={money(data, subtotal)} />
      {discount > 0 ? <Row label="Discount" value={`-${money(data, discount)}`} /> : null}
      {tax > 0 ? <Row label={taxLabel} value={money(data, tax)} /> : null}
      {data.shippingValue > 0 ? <Row label="Shipping" value={money(data, data.shippingValue)} /> : null}
      <Row label="Total" value={money(data, total)} strong accent />
      {data.amountPaid > 0 ? <Row label="Amount Paid" value={money(data, data.amountPaid)} /> : null}
      <Row label="Balance Due" value={money(data, balance)} strong />
    </div>
  );
}

function Row({ label, value, strong = false, accent = false }: { label: string; value: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-3 py-2 ${strong ? "font-bold" : ""}`} style={accent ? { background: "var(--bc)", color: "white", borderRadius: 4, marginTop: 4 } : {}}>
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

export function SignatureBlock() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-10 text-[10px]">
      <div className="border-t border-[#d1d5db] pt-2 text-center">Signature of Client</div>
      <div className="border-t border-[#d1d5db] pt-2 text-center">Company Signature</div>
    </div>
  );
}

export function NoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 bg-[var(--bc-soft)] p-3 text-[9px] italic text-[#4b5563]" style={{ borderLeft: "3px solid var(--bc)" }}>
      {children}
    </div>
  );
}

export function FooterAddress({ address }: { address?: string }) {
  return <div className="mt-6 border-t border-[#e5e7eb] pt-3 text-center text-[9px] text-[#6b7280]">{safe(address)}</div>;
}
