"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";

function Logo() {
  return (
    <div className="h-7 w-7 rounded-full bg-[var(--brand-primary)] shadow-[var(--shadow-sm)]" />
  );
}

export function FloatingHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const py = useTransform(scrollY, [0, 80], [8, 6]);

  return (
    <motion.header
      style={{ paddingTop: py, paddingBottom: py }}
      className="fixed left-1/2 top-3 z-50 flex h-14 w-[calc(100vw-1rem)] max-w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 items-center gap-2 rounded-[9999px] border border-[var(--border-default)] bg-[var(--bg-elevated)]/80 px-3 shadow-[var(--shadow-lg)] ring-1 ring-black/5 backdrop-blur-xl backdrop-saturate-150 dark:ring-white/5 md:top-4 md:h-16"
    >
      <Link href="/" className="focus-ring flex items-center gap-2 px-3">
        <Logo />
        <span className="text-[18px] font-bold">
          <span className="text-[var(--brand-primary)]">Invoicely</span>
          <span className="text-[var(--text-primary)]">Pro</span>
        </span>
      </Link>
      <div className="hidden h-6 w-px bg-[var(--border-default)] md:block" />
      <nav className="hidden items-center gap-1 px-2 md:flex">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring relative rounded-[9999px] px-3 py-2 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {active && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 -z-10 rounded-[9999px] bg-[var(--bg-tertiary)]"
                />
              )}
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="ml-auto flex items-center gap-2 pr-1">
        <ThemeToggle />
        <Link
          href="/#generator"
          className="focus-ring hidden h-10 items-center rounded-[9999px] bg-[var(--brand-primary)] px-5 text-[14px] font-semibold text-white hover:bg-[var(--brand-primary-hover)] md:inline-flex"
        >
          Create Invoice
        </Link>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] md:hidden"
              type="button"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
            <Dialog.Content className="fixed inset-0 z-[60] bg-[var(--bg-primary)] p-8">
              <Dialog.Description className="sr-only">
                Mobile navigation menu for InvoicelyPro pages.
              </Dialog.Description>
              <div className="mb-8 flex items-center justify-between">
                <Dialog.Title className="text-xl font-semibold">Menu</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="focus-ring rounded-full p-2" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="focus-ring rounded-xl border border-[var(--border-default)] p-4 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </motion.header>
  );
}
