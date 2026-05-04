"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const MOCKUPS = [
  { title: "House Contract Invoice", src: "/templates/thumbs/house-contract-invoice.png" },
  { title: "Freelancer Invoice", src: "/templates/thumbs/freelancer-invoice.png" },
  { title: "Hotel Booking Invoice", src: "/templates/thumbs/hotel-booking-invoice-two.png" },
  { title: "Restaurant Bill Invoice", src: "/templates/thumbs/restaurant-bill-invoice-two.png" },
];

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOCKUPS.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const active = MOCKUPS[activeIndex];

  return (
    <section className="container-shell flex min-h-[calc(100svh-6rem)] items-start pt-8 pb-4 md:items-center md:py-4">
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
        <div ref={cardRef} className="mx-auto w-full max-w-[420px] rotate-1 rounded-3xl border border-[var(--border-default)] bg-white p-4 shadow-2xl">
          <p className="text-sm font-medium text-slate-500">{active.title}</p>
          <div className="relative mt-3 aspect-[1/1.2] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              src={active.src}
              alt={`${active.title} mockup`}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 70vw, 28vw"
            />
          </div>
          <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Professional Invoices
          </div>
        </div>
      </div>
    </section>
  );
}
