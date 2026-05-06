import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATE_LIST } from "@/components/templates";

export const metadata: Metadata = {
  title: "Invoice Templates",
  description: "Browse our three invoice templates.",
};

export default function TemplatesPage() {
  return (
    <section className="container-shell py-20 md:py-28">
      <h1 className="text-4xl font-bold md:text-6xl">Invoice Templates</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {TEMPLATE_LIST.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
            <div className="aspect-[1/1.4] overflow-hidden rounded-xl border border-[var(--border-default)] p-3">
              <div className="h-6 rounded" style={{ backgroundColor: item.defaultColor }} />
              <div className="mt-3 h-2 w-1/2 rounded bg-[var(--bg-tertiary)]" />
              <div className="mt-2 h-2 rounded bg-[var(--bg-tertiary)]" />
              <div className="mt-2 h-2 w-4/5 rounded bg-[var(--bg-tertiary)]" />
            </div>
            <h2 className="mt-3 text-lg font-semibold">{item.name}</h2>
            <Link href={`/?template=${item.id}#generator`} className="mt-3 inline-block rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white">
              Use Template
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
