"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TEMPLATE_LIST, type TemplateCategory } from "@/components/templates";
import { useInvoiceStore } from "@/lib/invoice-store";

const CATEGORIES: Array<"All" | TemplateCategory> = [
  "All",
  "General",
  "Travel & Booking",
  "Hospitality",
  "Healthcare",
  "Education",
  "Entertainment",
  "Services",
  "Real Estate",
  "Finance",
  "Freelance",
];

export function TemplateSwitcher() {
  const { data, setData } = useInvoiceStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | TemplateCategory>("All");

  const filtered = useMemo(
    () =>
      TEMPLATE_LIST.filter((tpl) => {
        const categoryMatch = category === "All" || tpl.category === category;
        const query = search.trim().toLowerCase();
        const queryMatch = !query || tpl.name.toLowerCase().includes(query);
        return categoryMatch && queryMatch;
      }),
    [category, search],
  );

  const selected = TEMPLATE_LIST.find((tpl) => tpl.id === data.templateId);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="focus-ring inline-flex h-11 w-full min-w-0 items-center rounded-full border border-[var(--border-default)] px-4 text-sm font-semibold">
          <span className="block min-w-0 truncate">🎨 Change Template ({selected?.name ?? "Select"})</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] h-[88vh] w-[96vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-3xl bg-[var(--bg-primary)] p-6">
          <Dialog.Title className="text-2xl font-bold">Choose Template</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search and choose an invoice template to apply in the generator.
          </Dialog.Description>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search templates..."
            className="focus-ring mt-4 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`focus-ring rounded-full px-3 py-1 text-xs ${category === cat ? "bg-[var(--brand-primary)] text-white" : "border border-[var(--border-default)]"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((tpl) => (
              <article key={tpl.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3">
                <div className="relative aspect-[1/1.4] overflow-hidden rounded-xl bg-[var(--bg-tertiary)]">
                  <Image src={tpl.thumb} alt={tpl.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
                <h4 className="mt-3 text-sm font-semibold">{tpl.name}</h4>
                <span className="mt-1 inline-block rounded-full bg-[var(--bg-tertiary)] px-2 py-0.5 text-[10px]">
                  {tpl.category}
                </span>
                <button
                  onClick={() => {
                    setData({ templateId: tpl.id });
                    setOpen(false);
                  }}
                  className="focus-ring mt-3 w-full rounded-full bg-[var(--brand-primary)] py-2 text-sm font-semibold text-white"
                >
                  Use this
                </button>
              </article>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
