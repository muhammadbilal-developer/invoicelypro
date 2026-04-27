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
      <h2 className="text-3xl font-bold md:text-5xl">Loved by 100,000+ businesses</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {items.map(([author, quote]) => (
          <article key={author} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
            <div className="mb-3 text-amber-500">★★★★★</div>
            <p className="text-[var(--text-secondary)]">{quote}</p>
            <p className="mt-4 text-sm font-semibold">{author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
