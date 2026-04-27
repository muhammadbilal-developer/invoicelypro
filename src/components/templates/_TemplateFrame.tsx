"use client";

import { ReactNode } from "react";

export function TemplateFrame({
  children,
  brandColor = "#2563EB",
}: {
  children: ReactNode;
  brandColor?: string;
}) {
  return (
    <div
      data-invoice-frame
      className="invoice-a4 bg-white text-[#1a1a1a]"
      style={
        {
          width: "100%",
          maxWidth: "210mm",
          minHeight: "297mm",
          padding: "15mm 14mm",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "11px",
          lineHeight: 1.45,
          "--bc": brandColor,
          "--bc-soft": `${brandColor}14`,
          "--bc-tint": `${brandColor}22`,
          boxShadow: "0 1px 3px rgba(0,0,0,.08)",
          margin: "0 auto",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
