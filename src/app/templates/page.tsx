import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_LIST } from "@/components/templates";

export const metadata: Metadata = {
  title: "Invoice Templates",
  description: "Browse 30+ professional invoice templates for every business niche.",
};

export default function TemplatesPage() {
  return (
    // <section className="container-shell py-20 md:py-28">
    //   <h1 className="text-4xl font-bold md:text-6xl">All 30+ Invoice Templates</h1>
    //   <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    //     {TEMPLATE_LIST.map((item) => (
    //       <article key={item.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
    //         <div className="relative aspect-[1/1.414] overflow-hidden rounded-xl bg-[var(--bg-tertiary)] p-1">
    //           <Image src={item.thumb} alt={item.name} fill sizes="(max-width: 768px) 90vw, 25vw" className="object-contain" loading="lazy" />
    //         </div>
    //         <h2 className="mt-3 text-lg font-semibold">{item.name}</h2>
    //         <p className="text-xs text-[var(--text-secondary)]">{item.category}</p>
    //         <Link href={`/?template=${item.id}#generator`} className="mt-3 inline-block rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white">
    //           Use Template
    //         </Link>
    //       </article>
    //     ))}
    //   </div>
    // </section>
  
        <section className="container-shell py-20 md:py-28">
          <h1 className="text-4xl font-bold md:text-6xl">All 30+ Invoice Templates</h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {TEMPLATE_LIST.map((item) => (
              <article key={item.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
                <div className="relative aspect-[1/1.4] overflow-hidden rounded-xl bg-[var(--bg-tertiary)]">
                  <Image src={item.thumb} alt={item.name} fill sizes="(max-width: 768px) 90vw, 25vw" loading="lazy" />
                </div>
                <h2 className="mt-3 text-lg font-semibold">{item.name}</h2>
                <p className="text-xs text-[var(--text-secondary)]">{item.category}</p>
                <Link href={`/?template=${item.id}#generator`} className="mt-3 inline-block rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white">
                  Use Template
                </Link>
              </article>
            ))}
          </div>
        </section>
      );
}
