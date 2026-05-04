"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { TemplateSwitcher } from "./TemplateSwitcher";

const MAIN_CURRENCIES = [
  { code: "USD", label: "US Dollar ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "GBP", label: "British Pound (£)" },
  { code: "JPY", label: "Japanese Yen (¥)" },
  { code: "CNY", label: "Chinese Yuan (¥)" },
] as const;

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
        <div className="grid min-w-0 gap-3">
          <TemplateSwitcher />
          <label className="text-sm font-medium">Upload Logo</label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            className="focus-ring block w-full min-w-0 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2"
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
          <Input value={data.companyName} onChange={(v) => setData({ companyName: v, fromName: v || data.fromName })} placeholder="Company Name" />
          <Input value={data.fromAddress} onChange={(v) => setData({ fromAddress: v })} placeholder="Address" />
          <div className="grid grid-cols-2 gap-2">
            <Input value={data.fromPhone} onChange={(v) => setData({ fromPhone: v })} placeholder="From Phone" />
            <Input value={data.fromEmail} onChange={(v) => setData({ fromEmail: v })} placeholder="From Email" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={data.issueDate} onChange={(v) => setData({ issueDate: v })} placeholder="Issue Date" />
            <Input type="date" value={data.dueDate} onChange={(v) => setData({ dueDate: v })} placeholder="Due Date" />
          </div>
          <Input value={data.toName} onChange={(v) => setData({ toName: v })} placeholder="To" />
          <Input value={data.toAddress} onChange={(v) => setData({ toAddress: v })} placeholder="To Address" />
          <div className="grid grid-cols-2 gap-2">
            <Input value={data.toPhone} onChange={(v) => setData({ toPhone: v })} placeholder="To Phone" />
            <Input value={data.toEmail} onChange={(v) => setData({ toEmail: v })} placeholder="To Email" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input value={data.taxLabel} onChange={(v) => setData({ taxLabel: v })} placeholder="Tax Label (VAT / Sales Tax)" />
            <Input
              type="number"
              value={String(data.taxValue)}
              onChange={(v) => {
                const val = Number(v || 0);
                setData({ taxValue: val, taxMode: val > 0 ? "flat" : "off" });
              }}
              placeholder="Tax Value"
            />
          </div>
          <label className="text-sm font-medium" htmlFor="currency">
            Currency
          </label>
          <select
            id="currency"
            className="focus-ring w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2"
            value={data.currency}
            onChange={(event) => setData({ currency: event.target.value })}
          >
            {MAIN_CURRENCIES.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.label}
              </option>
            ))}
          </select>
          <textarea
            className="focus-ring w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2"
            value={data.terms}
            onChange={(event) => setData({ terms: event.target.value })}
            placeholder="Terms & Conditions"
            rows={3}
          />
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
