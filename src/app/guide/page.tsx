import type { Metadata } from "next";
import Link from "next/link";

const guides = [
  ["what-is-an-invoice", "What is an invoice?"],
  ["how-to-write-an-invoice", "How to write an invoice"],
  ["payment-terms", "Invoice payment terms explained"],
  ["invoice-vs-receipt-vs-quote", "Invoice vs Receipt vs Quote vs Estimate"],
  ["invoice-numbering-best-practices", "Invoice numbering best practices"],
  ["invoice-international-clients", "How to invoice international clients"],
  ["pakistan-fbr-invoice", "Pakistan FBR invoice requirements"],
  ["tax-vs-commercial-invoice", "Tax invoice vs commercial invoice"],
  ["unpaid-invoice-follow-up", "How to follow up on unpaid invoices"],
  ["invoice-mistakes", "Top 10 invoice mistakes to avoid"],
];

export const metadata: Metadata = {
  title: "Invoicing Guide",
  description: "Learn invoicing best practices with practical, SEO-focused guides.",
};

export default function GuidePage() {
  return (
    <section className="container-shell py-20 md:py-28">
      <h1 className="text-4xl font-bold md:text-6xl">Invoicing Guide</h1>
      <div className="mt-8 grid gap-4">
        {guides.map(([slug, label]) => (
          <Link key={slug} href={`/guide/${slug}`} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 font-medium hover:bg-[var(--bg-tertiary)]">
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
