"use client";

import { useMemo } from "react";
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
  const template = TEMPLATES[data.templateId] ?? TEMPLATES["general-invoice"];
  const TemplateComponent = template.Component;

  return (
    <div className="lg:sticky lg:top-24">
      <div
        id="invoice-preview"
        className="mx-auto w-full max-w-[800px] overflow-x-auto rounded-lg bg-transparent shadow-2xl"
      >
        <div>
          <TemplateComponent data={normalized} />
        </div>
      </div>
    </div>
  );
}
