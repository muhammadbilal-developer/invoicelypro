"use client";

import { useMemo } from "react";
import { TEMPLATES } from "@/components/templates";
import { useInvoiceStore } from "@/lib/invoice-store";
import type { InvoiceData } from "@/lib/invoice-store";

export function InvoicePreview() {
  const { data } = useInvoiceStore();
  const normalized = useMemo<InvoiceData>(
    () =>
      ({
        ...data,
        currencySymbol: "$",
        from: {
          name: data.fromName,
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
    <div className="sticky top-24">
      <div id="invoice-preview" className="mx-auto w-full max-w-[800px] overflow-hidden rounded-lg bg-transparent shadow-2xl">
        <div>
          <TemplateComponent data={normalized} />
        </div>
      </div>
    </div>
  );
}
