"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { TemplateFrame } from "./_TemplateFrame";
import { DocumentTitle, FooterAddress, ItemsTable, Logo, MetaRow, NoteBlock, PartyBlock, SignatureBlock, TotalsBlock, safe } from "./_blocks";

export function MovieBookingInvoice({ data }: { data: InvoiceData }) {
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
    <TemplateFrame brandColor={"#2563EB"}>
      <header className="mb-6">
        
        <div className="flex items-start justify-between">
          <div>
            <Logo data={data} fallbackText="Invar" />
          </div>
          <div className="text-right">
            <DocumentTitle text={data.documentType} />
            <MetaRow label="Invoice No" value={data.invoiceNumber} />
            <MetaRow label="Date" value={data.issueDate} />
            <MetaRow label="Due" value={data.dueDate} />
          </div>
        </div>
      </header>

      <section className="mb-5 grid grid-cols-2 gap-7">
        <PartyBlock title="From:" party={from} />
        <PartyBlock title="To:" party={to} align="right" />
      </section>

      <section className="mb-5 grid grid-cols-2 gap-2 rounded-md bg-[#f8fafc] p-3 text-[10px]">
        <div><b>Template</b><br />Movie Booking Invoice</div>
        <div><b>Status</b><br />Confirmed</div>
        </section>

      <ItemsTable data={data} items={data.items} columns={["sl","description","price","qty","total"]} variant="filled" />

      <section className="mt-4 flex justify-end">
        <TotalsBlock data={data} className="w-[42%]" />
      </section>

      <section className="mt-7 text-[10px]">
        <h4 className="mb-1 text-[11px] font-bold uppercase" style={{ color: "var(--bc)" }}>Terms & Conditions</h4>
        <div className="w-full whitespace-pre-line break-words leading-5 text-[#374151]">{data.terms || "—"}</div>
      </section>

      
      <NoteBlock>NOTE: This is a computer generated receipt and does not require physical signature.</NoteBlock>
      <FooterAddress address={`${from.address || "—"} • ${from.email || "—"}`} />
    </TemplateFrame>
  );
}

export default MovieBookingInvoice;
