export async function POST(req: Request) {
  const body = await req.json();
  const to = body?.to ?? "";
  const subject = encodeURIComponent(body?.subject ?? "Invoice from InvoicelyPro");
  const text = encodeURIComponent(body?.text ?? "Please find your invoice attached.");
  const mailto = `mailto:${to}?subject=${subject}&body=${text}`;
  return Response.json({ mailto });
}
