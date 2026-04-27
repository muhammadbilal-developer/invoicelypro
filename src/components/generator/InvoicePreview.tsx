"use client";

import { useMemo } from "react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { TEMPLATE_PRESETS } from "@/lib/template-presets";

export function InvoicePreview() {
  const { data } = useInvoiceStore();
  const selectedTemplate =
    TEMPLATE_PRESETS.find((template) => template.id === data.templateId) ?? TEMPLATE_PRESETS[0];

  const totals = useMemo(() => {
    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const tax =
      data.taxMode === "percent" ? (subtotal * data.taxValue) / 100 : data.taxMode === "flat" ? data.taxValue : 0;
    const discount =
      data.discountMode === "percent"
        ? (subtotal * data.discountValue) / 100
        : data.discountMode === "flat"
          ? data.discountValue
          : 0;
    const total = subtotal + tax + data.shippingValue - discount;
    return { subtotal, tax, discount, total, balance: total - data.amountPaid };
  }, [data]);

  return (
    <div className="sticky top-24">
      <div id="invoice-preview" className="mx-auto aspect-[210/297] w-full max-w-[600px] overflow-hidden rounded-lg bg-white text-slate-900 shadow-2xl">
        <div
          className={`p-6 ${
            selectedTemplate.layout === "split"
              ? "grid grid-cols-[1fr_auto] gap-3"
              : selectedTemplate.layout === "banner"
                ? "space-y-3"
                : "flex items-center justify-between"
          }`}
          style={{ backgroundColor: selectedTemplate.soft }}
        >
          <div className="flex items-center gap-3">
            {data.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logo} alt="Uploaded logo" className="h-10 w-10 rounded-md object-contain bg-white p-1" />
            ) : (
              <div className="h-10 w-10 rounded-md" style={{ backgroundColor: selectedTemplate.accent }} />
            )}
            <div>
              <p className="text-xs uppercase tracking-wide" style={{ color: selectedTemplate.dark }}>
                InvoicelyPro
              </p>
              <p className="text-sm font-semibold">{selectedTemplate.name}</p>
            </div>
          </div>
          <h3 className="text-3xl font-bold uppercase" style={{ color: selectedTemplate.dark }}>
            {data.documentType}
          </h3>
        </div>
        <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <h4 className="text-lg font-semibold">{selectedTemplate.name}</h4>
          <div className="text-right text-sm">
            <p>{data.invoiceNumber}</p>
            <p>{data.issueDate}</p>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="mb-1 text-xs uppercase text-slate-500">Bill From</p>
            <p className="font-semibold">{data.fromName || "Your Company"}</p>
            <p>{data.fromAddress}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-slate-500">Bill To</p>
            <p className="font-semibold">{data.toName || "Client"}</p>
            <p>{data.toAddress}</p>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200" style={{ backgroundColor: selectedTemplate.soft }}>
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Rate</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="py-2">{item.description}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">{item.rate.toFixed(2)}</td>
                <td className="py-2 text-right">{(item.quantity * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ml-auto mt-6 max-w-[260px] space-y-1 text-sm">
          <Row label="Subtotal" value={totals.subtotal} />
          <Row label="Tax" value={totals.tax} />
          <Row label="Discount" value={-totals.discount} />
          <Row label="Shipping" value={data.shippingValue} />
          <Row label="Total" value={totals.total} bold />
          <Row label="Paid" value={data.amountPaid} />
          <Row label="Balance Due" value={totals.balance} bold />
        </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold" : ""}`}>
      <span>{label}</span>
      <span>{value.toFixed(2)}</span>
    </div>
  );
}
