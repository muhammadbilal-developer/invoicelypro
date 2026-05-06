"use client";

import { FileText, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

export function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative w-full overflow-hidden bg-[#075fa6] py-12 text-white md:py-14 lg:min-h-[370px]">
      <div className="container-shell">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,520px)] lg:items-center">
          <div ref={ref} className={inView ? "reveal reveal-visible" : "reveal"}>
            <h1 className="text-4xl font-medium leading-tight md:text-5xl">
              Free Online Invoice Generator
            </h1>
            <p className="mt-5 max-w-[690px] text-lg font-semibold leading-8 text-white md:text-xl">
              Free invoice generator with 30+ templates for every business. Download as PDF instantly. No signup. No watermark.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-xl border border-white/20 bg-white p-6 shadow-[var(--shadow-xl)]">
            <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] p-6 text-[var(--text-primary)]">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                Why Teams Choose InvoicelyPro
              </p>
              <div className="mt-4 grid gap-3">
                <FeaturePill icon={<Zap className="h-4 w-4" />} text="Create and export in under 60 seconds" />
                <FeaturePill icon={<ShieldCheck className="h-4 w-4" />} text="No signup, no watermark, secure flow" />
                <FeaturePill icon={<Sparkles className="h-4 w-4" />} text="30+ modern templates for every niche" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Stat value="30+" label="Templates" />
                <Stat value="165+" label="Currencies" />
                <Stat value="1-click" label="PDF" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex justify-center">
          <Link
            href="/#generator"
            className="focus-ring inline-flex min-h-[88px] w-full max-w-[390px] items-center justify-center gap-3 bg-[#00ad45] px-8 py-5 text-center text-2xl font-medium text-white transition hover:bg-[#009c3e]"
          >
            <FileText className="h-7 w-7" aria-hidden="true" />
            <span>Create Your Invoice Now</span>
          </Link>
        </div>
      </div>
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
