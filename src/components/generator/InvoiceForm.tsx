"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { TEMPLATE_PRESETS } from "@/lib/template-presets";

export function InvoiceForm() {
  const { data, setData, setItems } = useInvoiceStore();

  const onLogoUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setData({ logo: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
        <h3 className="mb-4 text-lg font-semibold">Template & Branding</h3>
        <div className="grid gap-3">
          <label className="text-sm font-medium">Select Template</label>
          <select
            className="focus-ring rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2"
            value={data.templateId}
            onChange={(event) => setData({ templateId: event.target.value })}
          >
            {TEMPLATE_PRESETS.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <label className="text-sm font-medium">Upload Logo</label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            className="focus-ring rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2"
            onChange={(event) => onLogoUpload(event.target.files?.[0])}
          />
        </div>
      </section>
      <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
        <h3 className="mb-4 text-lg font-semibold">Document Type</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {(["invoice", "estimate", "receipt", "quote", "credit-note", "po"] as const).map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setData({ documentType: type })}
              className={`focus-ring rounded-full border px-3 py-2 text-sm ${data.documentType === type ? "border-[var(--brand-primary)] bg-[var(--bg-tertiary)]" : "border-[var(--border-default)]"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
        <h3 className="mb-4 text-lg font-semibold">Parties</h3>
        <div className="grid gap-3">
          <Input value={data.fromName} onChange={(v) => setData({ fromName: v })} placeholder="From Name" />
          <Input value={data.toName} onChange={(v) => setData({ toName: v })} placeholder="To Name" />
          <Input value={data.currency} onChange={(v) => setData({ currency: v })} placeholder="Currency (USD)" />
        </div>
      </section>
      <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Line Items</h3>
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-1 rounded-full bg-[var(--brand-primary)] px-3 py-1.5 text-sm text-white"
            onClick={() =>
              setItems([...data.items, { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 }])
            }
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
        <AnimatePresence>
          {data.items.map((item) => (
            <motion.div layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-3 grid grid-cols-[1fr_90px_90px_40px] gap-2">
              <Input
                value={item.description}
                onChange={(v) =>
                  setItems(data.items.map((i) => (i.id === item.id ? { ...i, description: v } : i)))
                }
                placeholder="Description"
              />
              <Input
                type="number"
                value={String(item.quantity)}
                onChange={(v) =>
                  setItems(data.items.map((i) => (i.id === item.id ? { ...i, quantity: Number(v || 0) } : i)))
                }
                placeholder="Qty"
              />
              <Input
                type="number"
                value={String(item.rate)}
                onChange={(v) =>
                  setItems(data.items.map((i) => (i.id === item.id ? { ...i, rate: Number(v || 0) } : i)))
                }
                placeholder="Rate"
              />
              <button
                type="button"
                className="focus-ring rounded-lg border border-[var(--border-default)]"
                onClick={() => setItems(data.items.filter((i) => i.id !== item.id))}
              >
                <Trash2 className="mx-auto h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      className="focus-ring w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
}
