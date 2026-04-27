import { CTABanner } from "@/components/home/CTABanner";
import { FAQ } from "@/components/home/FAQ";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InvoiceGeneratorApp } from "@/components/home/InvoiceGeneratorApp";
import { TemplatesShowcase } from "@/components/home/TemplatesShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustSection } from "@/components/home/TrustSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create Professional Invoices in 60 Seconds",
  description:
    "Free invoice generator with 30+ templates for restaurants, freelancers, hospitals, hotels, and more. Download PDF instantly with no signup.",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ template?: string }>;
}) {
  const params = (await searchParams) ?? {};
  return (
    <>
      <Hero />
      <InvoiceGeneratorApp initialTemplateId={params.template} />
      <TemplatesShowcase />
      <FeaturesGrid />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
