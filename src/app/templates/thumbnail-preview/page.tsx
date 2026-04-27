import { TEMPLATES, TEMPLATE_LIST } from "@/components/templates";
import { mockInvoiceData } from "@/lib/mock-invoice-data";

export default async function ThumbnailPreviewPage({
  searchParams,
}: {
  searchParams?: Promise<{ id?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const templateId = params.id && TEMPLATES[params.id] ? params.id : TEMPLATE_LIST[0].id;
  const TemplateComponent = TEMPLATES[templateId].Component;
  const data = { ...mockInvoiceData, templateId };

  return (
    <main className="min-h-screen bg-[#eef2f7] p-10">
      <TemplateComponent data={data} />
    </main>
  );
}
