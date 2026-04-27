"use client";

import { exportInvoicePDF } from "@/lib/pdf-export";

export function DownloadButtons() {
  const downloadWord = () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head><meta charset='utf-8'></head>
      <body>${element.innerHTML}</body>
      </html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoicelypro-invoice.doc";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sticky bottom-0 z-20 mt-4 flex flex-wrap gap-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3">
      <ActionButton
        label="Download PDF"
        onClick={async () => {
          await exportInvoicePDF("invoicelypro-invoice.pdf");
        }}
      />
      <ActionButton label="Print" onClick={() => window.print()} />
      <ActionButton label="Download Word" onClick={downloadWord} />
      <ActionButton
        label="Email Invoice"
        onClick={() => {
          window.open("mailto:?subject=Invoice from InvoicelyPro", "_self");
        }}
      />
      <ActionButton
        label="Share Link"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
        }}
      />
      <ActionButton label="Save Draft" onClick={() => {}} />
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void | Promise<void> }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring h-11 rounded-full border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-tertiary)]"
    >
      {label}
    </button>
  );
}
