import Link from "next/link";

export function CTABanner() {
  return (
    <section className="container-shell py-20">
      <div className="rounded-3xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] px-10 py-16 text-white">
        <h2 className="text-3xl font-bold md:text-5xl">Ready to Send Your First Invoice?</h2>
        <p className="mt-3 text-white/90">
          Join 100,000+ professionals creating invoices in 60 seconds.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/#generator" className="focus-ring rounded-full bg-white px-6 py-3 font-semibold text-[var(--brand-primary)]">
            Create Free Invoice
          </Link>
          <Link href="/templates" className="focus-ring rounded-full border border-white px-6 py-3 font-semibold text-white">
            View Templates
          </Link>
        </div>
      </div>
    </section>
  );
}
