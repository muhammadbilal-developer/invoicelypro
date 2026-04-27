"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  "Is InvoicelyPro really free?",
  "Do I need to sign up to download my invoice?",
  "Can I add my logo and brand colors?",
  "Which currencies are supported?",
  "Does it work for Pakistan FBR-compliant invoices?",
  "Can I save my invoices and reload them later?",
  "How do I send the invoice to my client?",
  "Do my invoices have a watermark?",
  "Can I generate estimates and quotes too?",
  "Is my data private? Where is it stored?",
];

export function FAQ() {
  return (
    <section className="container-shell py-20">
      <h2 className="text-3xl font-bold md:text-5xl">Frequently Asked Questions</h2>
      <Accordion.Root type="single" collapsible className="mt-8 space-y-3">
        {QUESTIONS.map((question, index) => (
          <Accordion.Item key={question} value={`q-${index}`} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-5">
            <Accordion.Header>
              <Accordion.Trigger className="focus-ring flex w-full items-center justify-between py-4 text-left font-semibold">
                {question}
                <ChevronDown className="h-4 w-4" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pb-4 text-[var(--text-secondary)]">
              Yes. InvoicelyPro is built for fast, privacy-first invoice generation.
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
