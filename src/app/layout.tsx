import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invoicelypro.com"),
  title: {
    default: "Free Invoice Generator — Create Professional Invoices in 60 Seconds | InvoicelyPro",
    template: "%s | InvoicelyPro",
  },
  description:
    "Create and download professional invoices in seconds with 30+ templates, 165+ currencies, and no signup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full bg-[var(--bg-secondary)] text-[var(--text-primary)]">
        <ThemeProvider>
          <FloatingHeader />
          <main className="pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
