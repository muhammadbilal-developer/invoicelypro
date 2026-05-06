"use client";

import { Quote, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";

function GoogleBadge() {
  return (
    <span
      aria-label="Google reviews"
      title="Google reviews"
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-default)] bg-white text-sm font-bold shadow-sm"
    >
      <span className="text-[#4285F4]">G</span>
    </span>
  );
}

export function Testimonials() {
  const items = [
    ["Freelancer, PK", "I generate client invoices in under 2 minutes."],
    ["Restaurant Owner, US", "The templates are clean and easy to customize."],
    ["Photography Studio, UK", "My branding looks great on every invoice."],
    ["IT Contractor, PK", "PKR support and FBR fields are a big plus."],
    ["Hospital Admin, PK", "Fast billing workflow for daily operations."],
    ["Hotel Manager, Dubai", "Great for recurring invoices and quick exports."],
  ];
  return (
    <section className="container-shell py-20">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold md:text-5xl">Loved by 100,000+ businesses</h2>
        <GoogleBadge />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {items.map(([author, quote], index) => (
          <TestimonialCard key={author} author={author} quote={quote} delayMs={index * 40} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  author,
  quote,
  delayMs,
}: {
  author: string;
  quote: string;
  delayMs: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`${inView ? "reveal reveal-visible" : "reveal"} rounded-2xl border border-[var(--border-default)] border-l-transparent border-r-transparent bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-sm)] transition hover:border-l-[5px] hover:border-r-[5px] hover:border-l-[var(--brand-primary)] hover:border-r-[var(--brand-primary)]`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
        </div>
        <Quote className="h-4 w-4 text-[var(--text-tertiary)]" />
      </div>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">{quote}</p>
      <p className="mt-4 text-sm font-semibold">{author}</p>
    </article>
  );
}
