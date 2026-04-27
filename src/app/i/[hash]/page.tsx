import { StaticPage } from "@/components/layout/StaticPage";

export default async function SharedInvoicePage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;
  let decoded = "{}";
  try {
    decoded = atob(decodeURIComponent(hash));
  } catch {
    decoded = "{}";
  }

  return (
    <StaticPage title="Shared Invoice (Read-Only)">
      <p>This is a read-only shared invoice snapshot.</p>
      <pre className="overflow-auto rounded-xl bg-[var(--bg-tertiary)] p-4 text-xs">
        {decoded}
      </pre>
    </StaticPage>
  );
}
