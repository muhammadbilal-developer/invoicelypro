"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TEMPLATES } from "@/components/templates";
import { useInvoiceStore } from "@/lib/invoice-store";
import type { InvoiceData } from "@/lib/invoice-store";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
};

export function InvoicePreview() {
  const { data } = useInvoiceStore();
  const [pageIndex, setPageIndex] = useState(0);
  const normalized = useMemo<InvoiceData>(
    () =>
      ({
        ...data,
        currencySymbol: CURRENCY_SYMBOLS[data.currency] ?? "$",
        from: {
          name: data.companyName || data.fromName,
          address: data.fromAddress,
          email: data.fromEmail,
          phone: data.fromPhone,
          taxId: data.fromTaxId,
        },
        to: {
          name: data.toName,
          address: data.toAddress,
          email: data.toEmail,
          phone: data.toPhone,
          taxId: data.toTaxId,
        },
        taxLabel: data.taxLabel,
        shipToName: data.shipToName,
        shipToAddress: data.shipToAddress,
        shipToEmail: data.shipToEmail,
        shipToPhone: data.shipToPhone,
        subtotal: data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0),
        taxAmount: 0,
        discountAmount: 0,
        total: data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0),
        balanceDue: data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0) - data.amountPaid,
        extras: {},
      }) as unknown as InvoiceData,
    [data],
  );
  const template = TEMPLATES[data.templateId] ?? TEMPLATES["technology-template"];
  const TemplateComponent = template.Component;
  const itemPages = useMemo(() => {
    const chunks: InvoiceData["items"][] = [];
    for (let i = 0; i < normalized.items.length; i += 15) chunks.push(normalized.items.slice(i, i + 15));
    return chunks.length ? chunks : [[]];
  }, [normalized.items]);

  useEffect(() => {
    if (pageIndex > itemPages.length - 1) setPageIndex(itemPages.length - 1);
  }, [itemPages.length, pageIndex]);

  const pagedData = useMemo(
    () =>
      itemPages.map((items, index) => ({
        ...normalized,
        items,
        allItems: normalized.items,
        pageNumber: index + 1,
        pageCount: itemPages.length,
        showTotals: index === itemPages.length - 1,
      })),
    [itemPages, normalized],
  );

  return (
    <div className="lg:sticky lg:top-24">
      {itemPages.length > 1 ? (
        <div className="mb-3 flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2">
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-1 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs"
            onClick={() => setPageIndex((value) => Math.max(0, value - 1))}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-xs font-semibold">Page {pageIndex + 1} / {itemPages.length}</span>
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-1 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs"
            onClick={() => setPageIndex((value) => Math.min(itemPages.length - 1, value + 1))}
            disabled={pageIndex === itemPages.length - 1}
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
      <div
        id="invoice-preview"
        className="mx-auto w-full max-w-[800px] overflow-x-auto rounded-lg bg-transparent shadow-2xl"
      >
        <div>
          <TemplateComponent data={pagedData[pageIndex] as unknown as InvoiceData} />
        </div>
        <div data-invoice-export className="absolute -left-[99999px] top-0 w-[210mm]">
          {pagedData.map((page) => (
            <TemplateComponent
              key={`${data.templateId}-${(page as unknown as { pageNumber: number }).pageNumber}`}
              data={page as unknown as InvoiceData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
