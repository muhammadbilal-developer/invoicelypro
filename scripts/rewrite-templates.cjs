const fs = require("fs");
const path = require("path");

const defs = [
  ["GeneralInvoice", "General Invoice", "#2563EB", "filled", "classic"],
  ["HotelBookingInvoice", "Hotel Booking Invoice", "#2563EB", "filled", "card"],
  ["RestaurantBillInvoice", "Restaurant Bill Invoice", "#111827", "striped", "band"],
  ["BusBookingInvoice", "Bus Booking Invoice", "#7C3AED", "accent-header", "hero"],
  ["BusBookingInvoiceTwo", "Bus Booking Invoice Two", "#1D4ED8", "striped", "corner"],
  ["BusBookingInvoiceThree", "Bus Booking Invoice Three", "#2563EB", "outlined", "minimal"],
  ["TrainBookingInvoice", "Train Booking Invoice", "#0F766E", "accent-header", "hero"],
  ["TrainBookingInvoiceTwo", "Train Booking Invoice Two", "#2563EB", "striped", "corner"],
  ["InternetBillInvoice", "Internet Bill Invoice", "#334155", "filled", "card"],
  ["MovieBookingInvoice", "Movie Booking Invoice", "#2563EB", "filled", "strip"],
  ["StudentBillingInvoice", "Student Billing Invoice", "#7C3AED", "filled", "banner"],
  ["StudentBillingInvoiceTwo", "Student Billing Invoice Two", "#2563EB", "filled", "cta"],
  ["DomainAndHostingInvoice", "Domain And Hosting Invoice", "#2563EB", "filled", "cornerCard"],
  ["HospitalInvoice", "Hospital Invoice", "#10B981", "filled", "patient"],
  ["MoneyExchangeInvoice", "Money Exchange Invoice", "#0EA5E9", "filled", "summary"],
  ["RechargeInvoice", "Recharge Invoice", "#3B82F6", "filled", "compact"],
  ["ProductPurchaseInvoice", "Product Purchase Invoice", "#1D4ED8", "filled", "retail"],
  ["StudentAdmissionInvoice", "Student Admission Invoice", "#7C3AED", "outlined", "admission"],
  ["StudentAdmissionInvoiceTwo", "Student Admission Invoice Two", "#2563EB", "outlined", "admissionBanner"],
  ["ZooTicketInvoice", "Zoo Ticket Invoice", "#16A34A", "striped", "guestTable"],
  ["StadiumSeatBookingInvoice", "Stadium Seat Booking Invoice", "#2563EB", "striped", "doubleTable"],
  ["HouseContractInvoice", "House Contract Invoice", "#334155", "outlined", "signature"],
  ["RoofingServicesInvoice", "Roofing Services Invoice", "#EA580C", "filled", "contractor"],
  ["PhotostudioInvoice", "Photostudio Invoice", "#0F172A", "striped", "pattern"],
  ["PlumbingInvoice", "Plumbing Invoice", "#2563EB", "filled", "watermark"],
  ["RealEstateInvoice", "Real Estate Invoice", "#334155", "filled", "watermarkHouse"],
  ["RestaurantBillInvoiceTwo", "Restaurant Bill Invoice Two", "#111827", "accent-header", "foodBand"],
  ["TaxiBookingInvoice", "Taxi Booking Invoice", "#1D4ED8", "filled", "taxi"],
  ["HotelBookingInvoiceTwo", "Hotel Booking Invoice Two", "#0F1A12", "filled", "darkHero"],
];

const baseDir = path.resolve("src/components/templates");

function templateSource(file, title, accent, variant, motif) {
  const priceCol = variant === "filled" || variant === "accent-header" || variant === "striped";
  const sig = motif === "signature" || motif === "admission" || motif === "admissionBanner";
  const band =
    motif === "darkHero"
      ? '<div className="mb-3 rounded-md bg-[#0F1A12] p-4 text-white"><span className="text-[10px] uppercase">Premium Header</span></div>'
      : motif === "band" || motif === "foodBand"
        ? '<div className="mb-3 h-5 rounded-sm" style={{ background: "var(--bc)" }} />'
        : "";

  return `"use client";

import type { InvoiceData } from "@/lib/invoice-store";
import { TemplateFrame } from "./_TemplateFrame";
import { DocumentTitle, FooterAddress, ItemsTable, Logo, MetaRow, NoteBlock, PartyBlock, SignatureBlock, TotalsBlock, safe } from "./_blocks";

export function ${file}({ data }: { data: InvoiceData }) {
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
    <TemplateFrame brandColor={"${accent}"}>
      <header className="mb-6">
        ${band}
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

      <section className="mb-5 grid ${motif === "doubleTable" ? "grid-cols-2" : "grid-cols-4"} gap-2 rounded-md bg-gray-50 p-3 text-[10px]">
        <div><b>Template</b><br />${title}</div>
        <div><b>Reference</b><br />{safe((data as unknown as { extras?: Record<string,string> }).extras?.bookingId)}</div>
        <div><b>Status</b><br />Confirmed</div>
        <div><b>Method</b><br />{safe(data.paymentMethod)}</div>
      </section>

      <ItemsTable data={data} items={data.items} columns={["sl","description",${priceCol ? '"price",' : ""}"qty","total"]} variant="${variant}" />

      <section className="mt-4 flex justify-end">
        <TotalsBlock data={data} className="w-[42%]" />
      </section>

      <section className="mt-auto pt-7 grid grid-cols-2 gap-5 text-[10px]">
        <div>
          <h4 className="mb-1 text-[11px] font-bold uppercase" style={{ color: "var(--bc)" }}>Payment Info</h4>
          <div className="whitespace-pre-line text-gray-700">{data.paymentInstructions || "—"}</div>
        </div>
        <div>
          <h4 className="mb-1 text-[11px] font-bold uppercase" style={{ color: "var(--bc)" }}>Terms & Conditions</h4>
          <div className="whitespace-pre-line text-gray-700">{data.terms || "—"}</div>
        </div>
      </section>

      ${sig ? "<SignatureBlock />" : ""}
      <NoteBlock>NOTE: This is a computer generated receipt and does not require physical signature.</NoteBlock>
      <FooterAddress address={\`\${from.address || "—"} • \${from.email || "—"}\`} />
    </TemplateFrame>
  );
}

export default ${file};
`;
}

for (const [file, title, accent, variant, motif] of defs) {
  const source = templateSource(file, title, accent, variant, motif);
  fs.writeFileSync(path.join(baseDir, `${file}.tsx`), source, "utf8");
}

console.log(`Rewrote ${defs.length} template files.`);
