"use client";

import type { ReactNode } from "react";
import { Download, Printer, Trash2 } from "lucide-react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { exportInvoicePDF } from "@/lib/pdf-export";

export function DownloadButtons() {
  const { setItems } = useInvoiceStore();

  return (
    <div className="sticky bottom-0 z-20 mt-4 flex flex-wrap gap-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3">
      <ActionButton
        label="Download PDF"
        icon={<Download className="h-4 w-4" />}
        onClick={async () => {
          await exportInvoicePDF("invoicelypro-invoice.pdf");
        }}
      />
      <ActionButton label="Print" icon={<Printer className="h-4 w-4" />} onClick={() => window.print()} />
      <ActionButton
        label="Clear Items"
        icon={<Trash2 className="h-4 w-4" />}
        onClick={() => setItems([])}
      />
    </div>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void | Promise<void>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-tertiary)]"
    >
      {icon}
      {label}
    </button>
  );
}
