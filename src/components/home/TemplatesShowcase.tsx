import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_LIST } from "@/components/templates";

export function TemplatesShowcase() {
  return (
    <section className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">3 Modern Invoice Templates</h2>
      <p className="mt-3 text-[var(--text-secondary)]">
        Pick a layout, then personalize it with your own theme color.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TEMPLATE_LIST.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow-md)]">
            <div className="relative aspect-[1/1.414] overflow-hidden rounded-xl border border-[var(--border-default)] bg-white p-1">
              <Image src={item.thumb} alt={item.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-1" loading="lazy" />
            </div>
            <h3 className="mt-3 text-base font-semibold">{item.name}</h3>
            <Link href={`/?template=${item.id}#generator`} className="focus-ring mt-3 block w-full rounded-full border border-[var(--border-default)] py-2 text-center text-sm">
              Use this template
            </Link>
          </div>
        ))}
      </div>
      <Link href="/templates" className="mt-6 inline-block text-[var(--brand-primary)]">
        View all templates →
      </Link>
    </section>
  );
}
