const FEATURES = [
  "30+ Industry Templates",
  "Instant PDF Download",
  "165+ Currencies",
  "No Signup Required",
  "Light & Dark Mode",
  "AI Line Items",
  "Pakistan FBR Ready",
  "Save & Reuse",
];

export function FeaturesGrid() {
  return (
    <section id="features" className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">Everything You Need to Invoice Like a Pro</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map((title) => (
          <article key={title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Professional billing workflow tailored for modern businesses.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
