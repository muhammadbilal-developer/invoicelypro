"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative w-full overflow-hidden pt-8 pb-12 md:py-6 lg:h-[calc(100svh-6rem)] lg:py-4">
      <div className="container-shell flex items-start lg:h-full lg:items-center">
        <div className="grid w-full gap-6 lg:grid-cols-2 lg:items-center">
        <div ref={ref} className={inView ? "reveal reveal-visible" : "reveal"}>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Create{" "}
            <span className="relative inline-block">
              Professional
              <svg
                className="absolute -bottom-3 left-0 h-4 w-full text-[var(--brand-primary)]"
                viewBox="0 0 220 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 16C52 8 101 6 216 13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M5 21C82 10 147 10 211 17" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" opacity="0.75" />
              </svg>
            </span>{" "}
            Invoices in 60 Seconds.
          </h1>
          <p className="mt-4 max-w-[560px] text-base text-[var(--text-secondary)] md:text-lg">
            Free invoice generator with 30+ templates for every business. Download as PDF instantly. No signup. No watermark.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/#generator" className="focus-ring rounded-full bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white">
              Generate Invoice Now
            </Link>
            <Link href="/templates" className="focus-ring rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] px-6 py-3 font-semibold">
              Browse 30+ Templates
            </Link>
          </div>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            🔒 No signup required · ⚡ Instant PDF · 🌍 165+ currencies · 🇵🇰 PKR & FBR-compliant
          </p>
        </div>
          <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-xl)] ring-1 ring-black/5 dark:ring-white/10">
            <div className="pointer-events-none absolute -top-14 -right-10 h-40 w-40 rounded-full bg-[var(--brand-primary)]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[var(--brand-accent)]/20 blur-3xl" />
            <div className="relative rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                Why Teams Choose InvoicelyPro
              </p>
              <div className="mt-3 grid gap-2">
                <FeaturePill icon={<Zap className="h-4 w-4" />} text="Create and export in under 60 seconds" />
                <FeaturePill icon={<ShieldCheck className="h-4 w-4" />} text="No signup, no watermark, secure flow" />
                <FeaturePill icon={<Sparkles className="h-4 w-4" />} text="30+ modern templates for every niche" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat value="30+" label="Templates" />
                <Stat value="165+" label="Currencies" />
                <Stat value="1-click" label="PDF" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="hero-bottom-wave pointer-events-none absolute bottom-0 left-0 h-12 w-[100vw]"
      />
    </section>
  );
}

function FeaturePill({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">
      <span className="text-[var(--brand-primary)]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2 py-3">
      <div className="text-sm font-bold text-[var(--text-primary)]">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">{label}</div>
    </div>
  );
}
