import type { Metadata } from "next";
import { FAQ } from "@/components/home/FAQ";
import { InvoiceGeneratorApp } from "@/components/home/InvoiceGeneratorApp";
import { NICHES } from "@/lib/constants";

export function generateStaticParams() {
  return NICHES.map((niche) => ({ niche: niche.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string }>;
}): Promise<Metadata> {
  const { niche } = await params;
  const text = niche.replaceAll("-", " ");
  const title = `${text} Invoice Generator — Free PDF Templates`;
  return { title, description: `Create ${text} invoices online with live preview and instant PDF download.` };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ niche: string }>;
}) {
  const { niche } = await params;
  const title = niche
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <>
      <section className="container-shell py-20 md:py-28">
        <h1 className="text-4xl font-bold md:text-6xl">{title} Invoice Generator</h1>
        <p className="mt-4 max-w-3xl text-[var(--text-secondary)]">
          Generate professional {title.toLowerCase()} invoices with preloaded template structure, FBR-ready fields, and export-ready layout.
        </p>
      </section>
      <InvoiceGeneratorApp />
      <FAQ />
      <section className="container-shell pb-20">
        <article className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-8">
          <h2 className="text-3xl font-bold">About {title} Invoicing</h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            This page is optimized for niche invoicing workflows with localized terminology, payment practices, and tax-friendly formatting.
          </p>
        </article>
      </section>
    </>
  );
}
