import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATE_PRESETS } from "@/lib/template-presets";

export const metadata: Metadata = {
  title: "Invoice Templates",
  description: "Browse 30+ professional invoice templates for every business niche.",
};

export default function TemplatesPage() {
  return (
    <section className="container-shell py-20 md:py-28">
      <h1 className="text-4xl font-bold md:text-6xl">All 30+ Invoice Templates</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TEMPLATE_PRESETS.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
            <div className="aspect-[1/1.4] rounded-xl p-3" style={{ backgroundColor: item.soft }}>
              <div className="h-3 w-20 rounded" style={{ backgroundColor: item.accent }} />
              <div className="mt-3 h-2 w-full rounded bg-white/70" />
              <div className="mt-2 h-2 w-10/12 rounded bg-white/70" />
              <div className="mt-2 h-2 w-8/12 rounded bg-white/70" />
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
