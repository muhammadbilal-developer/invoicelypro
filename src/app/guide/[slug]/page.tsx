import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return {
    title,
    description: `${title} - practical invoicing guidance by InvoicelyPro.`,
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <StaticPage title={title}>
      <p>
        This guide explains {title.toLowerCase()} with actionable steps, practical examples,
        and policy considerations for global businesses.
      </p>
      <p>
        Use consistent numbering, clear payment terms, and complete tax fields to reduce payment delays and audit risk.
      </p>
    </StaticPage>
  );
}
