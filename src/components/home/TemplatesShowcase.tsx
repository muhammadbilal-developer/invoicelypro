import Link from "next/link";
import { TEMPLATE_DEFINITIONS } from "@/lib/constants";

export function TemplatesShowcase() {
  return (
    <section className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">30+ Designed-for-You Invoice Templates</h2>
      <p className="mt-3 text-[var(--text-secondary)]">
        Pick a template that fits your industry. Customize in seconds.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TEMPLATE_DEFINITIONS.slice(0, 8).map((item) => (
          <div key={item} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow-md)]">
            <div className="aspect-[1/1.4] rounded-xl bg-[var(--bg-tertiary)]" />
            <h3 className="mt-3 text-base font-semibold">{item.replaceAll("-", " ")}</h3>
            <button className="focus-ring mt-3 w-full rounded-full border border-[var(--border-default)] py-2 text-sm">
              Use this template
            </button>
          </div>
        ))}
      </div>
      <Link href="/templates" className="mt-6 inline-block text-[var(--brand-primary)]">
        View all 30+ templates →
      </Link>
    </section>
  );
}
