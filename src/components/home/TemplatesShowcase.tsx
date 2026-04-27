import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_LIST } from "@/components/templates";

export function TemplatesShowcase() {
  return (
    <section className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">30+ Designed-for-You Invoice Templates</h2>
      <p className="mt-3 text-[var(--text-secondary)]">
        Pick a template that fits your industry. Customize in seconds.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TEMPLATE_LIST.slice(0, 8).map((item) => (
          <div key={item.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow-md)]">
            <div className="relative aspect-[1/1.4] overflow-hidden rounded-xl bg-[var(--bg-tertiary)]">
              <Image src={item.thumb} alt={item.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" loading="lazy" />
            </div>
            <h3 className="mt-3 text-base font-semibold">{item.name}</h3>
            <Link href={`/?template=${item.id}#generator`} className="focus-ring mt-3 block w-full rounded-full border border-[var(--border-default)] py-2 text-center text-sm">
              Use this template
            </Link>
          </div>
        ))}
      </div>
      <Link href="/templates" className="mt-6 inline-block text-[var(--brand-primary)]">
        View all 30+ templates →
      </Link>
    </section>
  );
}
