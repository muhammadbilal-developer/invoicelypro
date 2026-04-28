"use client";

import { BadgeCheck, Globe2, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function TrustSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });
  return (
    <section className="container-shell py-10">
      <div
        ref={ref}
        className={`${inView ? "reveal reveal-visible" : "reveal"} rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-sm)]`}
      >
        <p className="text-center text-xl font-semibold">Used by 100,000+ freelancers in 150+ countries</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-[var(--bg-tertiary)] px-3 py-2 text-sm font-medium">
            <Users className="h-4 w-4 text-[var(--brand-primary)]" />
            100k+ active users
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl bg-[var(--bg-tertiary)] px-3 py-2 text-sm font-medium">
            <Globe2 className="h-4 w-4 text-[var(--brand-primary)]" />
            150+ countries
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl bg-[var(--bg-tertiary)] px-3 py-2 text-sm font-medium">
            <BadgeCheck className="h-4 w-4 text-[var(--brand-primary)]" />
            Trusted daily workflow
          </div>
        </div>
      </div>
    </section>
  );
}
