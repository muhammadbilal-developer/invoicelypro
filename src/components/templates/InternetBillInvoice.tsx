"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { TemplateFrame } from "./_TemplateFrame";
import { DocumentTitle, FooterAddress, ItemsTable, Logo, MetaRow, NoteBlock, PartyBlock, SignatureBlock, TotalsBlock, safe } from "./_blocks";

export function InternetBillInvoice({ data }: { data: InvoiceData }) {
  const legacy = data as unknown as Record<string, string | undefined>;
  const from = (data as unknown as { from?: Record<string, string> }).from ?? {
    name: legacy.fromName ?? "",
    address: legacy.fromAddress ?? "",
    email: legacy.fromEmail ?? "",
    phone: legacy.fromPhone ?? "",
    taxId: legacy.fromTaxId ?? "",
  };
  const to = (data as unknown as { to?: Record<string, string> }).to ?? {
    name: legacy.toName ?? "",
    address: legacy.toAddress ?? "",
    email: legacy.toEmail ?? "",
    phone: legacy.toPhone ?? "",
    taxId: legacy.toTaxId ?? "",
  };

  return (
    <TemplateFrame brandColor={"#334155"}>
      <header className="mb-6">
        
        <div className="flex items-start justify-between">
          <div>
            <Logo data={data} fallbackText="Invar" />
            <MetaRow label="Invoice No" value={data.invoiceNumber} />
          </div>
          <div className="text-right">
            <DocumentTitle text={data.documentType} />
            <MetaRow label="Date" value={data.issueDate} />
            <MetaRow label="Due" value={data.dueDate} />
          </div>
        </div>
      </header>

      <section className="mb-5 grid grid-cols-2 gap-7">
        <PartyBlock title="Invoiced To:" party={to} />
        <PartyBlock title="Pay To:" party={from} align="right" />
      </section>

      <section className="mb-5 grid grid-cols-4 gap-2 rounded-md bg-gray-50 p-3 text-[10px]">
        <div><b>Template</b><br />Internet Bill Invoice</div>
        <div><b>Reference</b><br />{safe((data as unknown as { extras?: Record<string,string> }).extras?.bookingId)}</div>
        <div><b>Status</b><br />Confirmed</div>
        <div><b>Method</b><br />{safe((data as unknown as { paymentMethod?: string }).paymentMethod)}</div>
      </section>

      <ItemsTable data={data} items={data.items} columns={["sl","description","price","qty","total"]} variant="filled" />

      <section className="mt-4 flex justify-end">
        <TotalsBlock data={data} className="w-[42%]" />
      </section>

      <section className="mt-7 grid grid-cols-2 gap-5 text-[10px]">
        <div>
          <h4 className="mb-1 text-[11px] font-bold uppercase" style={{ color: "var(--bc)" }}>Payment Info</h4>
          <div className="whitespace-pre-line text-gray-700">{data.paymentInstructions || "—"}</div>
        </div>
        <div>
          <h4 className="mb-1 text-[11px] font-bold uppercase" style={{ color: "var(--bc)" }}>Terms & Conditions</h4>
          <div className="whitespace-pre-line text-gray-700">{data.terms || "—"}</div>
        </div>
      </section>

      
      <NoteBlock>NOTE: This is a computer generated receipt and does not require physical signature.</NoteBlock>
      <FooterAddress address={`${from.address || "—"} • ${from.email || "—"}`} />
    </TemplateFrame>
  );
}

export default InternetBillInvoice;
