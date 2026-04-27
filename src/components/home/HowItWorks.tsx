export function HowItWorks() {
  const steps = ["Pick a Template", "Fill Your Details", "Download & Send"];
  return (
    <section className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">From Zero to Invoice in 3 Steps</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] text-white">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold">{step}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
