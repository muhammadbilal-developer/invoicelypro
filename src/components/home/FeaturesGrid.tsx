"use client";

import {
  Bot,
  Download,
  Globe,
  Layers3,
  MoonStar,
  ShieldCheck,
  UserCheck,
  WalletCards,
} from "lucide-react";
import type { ComponentType } from "react";
import { useInView } from "react-intersection-observer";

const FEATURES = [
  {
    title: "30+ Industry Templates",
    description: "From restaurants to hospitals, pick a ready-made professional layout.",
    Icon: Layers3,
  },
  {
    title: "Instant PDF Download",
    description: "One click export with print-ready quality and no watermark.",
    Icon: Download,
  },
  {
    title: "165+ Currencies",
    description: "Invoice clients worldwide with fast multi-currency support.",
    Icon: Globe,
  },
  {
    title: "No Signup Required",
    description: "Open, fill, export. No account, no onboarding friction.",
    Icon: UserCheck,
  },
  {
    title: "Light & Dark Mode",
    description: "Comfortable editing experience in every environment.",
    Icon: MoonStar,
  },
  {
    title: "AI Line Items",
    description: "Generate clean line items from your work description.",
    Icon: Bot,
  },
  {
    title: "Pakistan FBR Ready",
    description: "Built for practical invoicing requirements in Pakistan.",
    Icon: ShieldCheck,
  },
  {
    title: "Save & Reuse",
    description: "Store draft data in browser and reuse it in seconds.",
    Icon: WalletCards,
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">Everything You Need to Invoice Like a Pro</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map(({ title, description, Icon }, index) => (
          <FeatureCard key={title} title={title} description={description} Icon={Icon} delayMs={index * 40} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  Icon,
  delayMs,
}: {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  delayMs: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`${inView ? "reveal reveal-visible" : "reveal"} group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]`}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--brand-primary)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-[17px] font-semibold leading-tight">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
    </article>
  );
}
