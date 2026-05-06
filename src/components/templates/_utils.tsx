"use client";

import type { InvoiceData } from "@/lib/invoice-store";

export function formatDate(value?: string) {
  if (!value) return "—";
  return value;
}

export function safe(value?: string) {
  return value && value.trim() ? value : "—";
}

export function money(data: InvoiceData, amount: number) {
  const symbolMap: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
  };
  const symbol = symbolMap[data.currency] ?? "$";
  return `${symbol}${amount.toFixed(2)}`;
}

export function computeTotals(data: InvoiceData) {
  const allItems = ((data as unknown as { allItems?: InvoiceData["items"] }).allItems ?? data.items);
  const subtotal = allItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax =
    data.taxMode === "percent" ? (subtotal * data.taxValue) / 100 : data.taxMode === "flat" ? data.taxValue : 0;
  const discount =
    data.discountMode === "percent"
      ? (subtotal * data.discountValue) / 100
      : data.discountMode === "flat"
        ? data.discountValue
        : 0;
  const total = subtotal + tax + data.shippingValue - discount;
  return {
    subtotal,
    tax,
    discount,
    total,
    balanceDue: total - data.amountPaid,
  };
}

export function getPageMeta(data: InvoiceData) {
  const source = data as unknown as { pageNumber?: number; pageCount?: number; showTotals?: boolean };
  return {
    pageNumber: source.pageNumber ?? 1,
    pageCount: source.pageCount ?? 1,
    showTotals: source.showTotals ?? true,
  };
}

export function hexToRgb(hex: string) {
  const normalizedHex = /^#?[0-9A-Fa-f]{3}$|^#?[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#1C3557";
  const value = normalizedHex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map((ch) => ch + ch).join("") : value;
  const int = Number.parseInt(normalized, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

export function alpha(hex: string, opacity: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function textOnColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? "#111827" : "#FFFFFF";
}

export function CompanyLogo({ data, fallback }: { data: InvoiceData; fallback: string }) {
  if (data.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={data.logo} alt="Logo" style={{ maxHeight: 54, maxWidth: 160 }} />;
  }
  return <div className="text-lg font-bold tracking-[0.2em] text-[#111827]">{fallback}</div>;
}

