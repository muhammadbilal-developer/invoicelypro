"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Palette } from "lucide-react";
import { useState } from "react";
import { TEMPLATE_LIST } from "@/components/templates";
import { useInvoiceStore } from "@/lib/invoice-store";

function normalizeHex(value: string) {
  const raw = value.trim();
  const withHash = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#[0-9A-Fa-f]{6}$/.test(withHash) ? withHash : null;
}

export function TemplateSwitcher() {
  const { data, setData } = useInvoiceStore();
  const [open, setOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const selected = TEMPLATE_LIST.find((tpl) => tpl.id === data.templateId);

  return (
    <div className="space-y-3">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="focus-ring inline-flex h-11 w-full min-w-0 items-center rounded-full border border-[var(--border-default)] px-4 text-sm font-semibold">
            <span className="block min-w-0 truncate">🎨 Change Template ({selected?.name ?? "Select"})</span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-[var(--bg-primary)] p-5">
            <Dialog.Title className="text-2xl font-bold">Choose Template</Dialog.Title>
            <Dialog.Description className="sr-only">Choose one of the invoice templates.</Dialog.Description>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {TEMPLATE_LIST.map((tpl) => (
                <article key={tpl.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
                  <div className="relative aspect-[1/1.414] overflow-hidden rounded-xl border border-[var(--border-default)] bg-white p-1">
                    <Image src={tpl.thumb} alt={tpl.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-1" />
                  </div>
                  <h4 className="mt-3 text-sm font-semibold">{tpl.name}</h4>
                  <button
                    onClick={() => {
                      setData({ templateId: tpl.id, brandColor: tpl.defaultColor });
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

      <div>
        <label className="mb-1 block text-sm font-medium">Theme Color</label>
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowColors((value) => !value)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-default)]"
            aria-label="Open color presets"
          >
            <Palette className="h-5 w-5" />
          </button>
          <input
            type="color"
            value={normalizeHex(data.brandColor) ?? selected?.defaultColor ?? "#1C3557"}
            onChange={(event) => setData({ brandColor: event.target.value })}
            className="h-10 w-14 rounded-lg border border-[var(--border-default)] bg-transparent p-1"
            aria-label="Theme color"
          />
          <input
            type="text"
            value={data.brandColor}
            onChange={(event) => {
              const value = event.target.value;
              const normalized = normalizeHex(value);
              setData({ brandColor: normalized ?? value });
            }}
            className="focus-ring h-10 flex-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm"
            placeholder="#1C3557"
          />
          {showColors ? (
            <div className="absolute left-0 top-12 z-20 w-[260px] rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3 shadow-lg">
              <p className="mb-2 text-xs font-semibold">Preset Colors</p>
              <div className="grid grid-cols-5 gap-2">
                {TEMPLATE_LIST.map((tpl) => (
                  <button
                    key={`swatch-${tpl.id}`}
                    type="button"
                    onClick={() => setData({ brandColor: tpl.defaultColor })}
                    className="h-8 w-8 rounded-full border border-[var(--border-default)]"
                    style={{ backgroundColor: tpl.defaultColor }}
                    aria-label={`${tpl.name} default color`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
