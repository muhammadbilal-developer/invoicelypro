import { CheckCircle2, FileText, Send } from "lucide-react";

export function HowItWorks() {
  const steps = [
    { title: "Pick a Template", subtitle: "Choose from 30+ ready styles.", Icon: FileText },
    { title: "Fill Your Details", subtitle: "Live preview updates instantly.", Icon: CheckCircle2 },
    { title: "Download & Send", subtitle: "Export PDF and share quickly.", Icon: Send },
  ];

  return (
    <section className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">From Zero to Invoice in 3 Steps</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map(({ title, subtitle, Icon }, index) => (
          <div key={title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-sm)]">
            <div className="mb-3 flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] text-xs font-semibold text-white">
                {index + 1}
              </div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--brand-primary)]">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
