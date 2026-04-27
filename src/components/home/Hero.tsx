"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(cardRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="container-shell py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] md:text-7xl">
            Create Professional Invoices in 60 Seconds.
          </h1>
          <p className="mt-6 max-w-[560px] text-lg text-[var(--text-secondary)] md:text-xl">
            Free invoice generator with 30+ templates for every business. Download as PDF instantly. No signup. No watermark.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#generator" className="focus-ring rounded-full bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white">
              Generate Invoice Now
            </Link>
            <Link href="/templates" className="focus-ring rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] px-6 py-3 font-semibold">
              Browse 30+ Templates
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            🔒 No signup required · ⚡ Instant PDF · 🌍 165+ currencies · 🇵🇰 PKR & FBR-compliant
          </p>
        </div>
        <div ref={cardRef} className="rotate-2 rounded-3xl border border-[var(--border-default)] bg-white p-6 shadow-2xl">
          <p className="text-sm text-slate-500">Invoice Mockup</p>
          <div className="mt-4 h-80 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </section>
  );
}
