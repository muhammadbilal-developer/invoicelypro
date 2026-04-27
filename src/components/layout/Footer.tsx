import { AtSign, Globe, Link as LinkIcon, MessageCircle } from "lucide-react";
import Link from "next/link";

const legalLinks = [
  ["/about", "About Us"],
  ["/contact", "Contact Us"],
  ["/privacy-policy", "Privacy Policy"],
  ["/terms-of-service", "Terms of Service"],
  ["/dmca", "DMCA Policy"],
  ["/cookies-policy", "Cookies Policy"],
  ["/refund-policy", "Refund Policy"],
  ["/disclaimer", "Disclaimer"],
  ["/sitemap.xml", "Sitemap"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-tertiary)] px-6 py-16 md:px-10">
      <div className="container-shell grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">InvoicelyPro</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            The free, beautiful invoice generator for modern businesses.
          </p>
          <div className="flex gap-3 text-[var(--text-tertiary)]">
            <Globe className="h-5 w-5" />
            <LinkIcon className="h-5 w-5" />
            <AtSign className="h-5 w-5" />
            <MessageCircle className="h-5 w-5" />
          </div>
        </div>
        <FooterCol
          title="Product"
          links={[
            ["/", "Invoice Generator"],
            ["/templates", "All Templates"],
            ["/pricing", "Pricing"],
            ["/#features", "Features"],
            ["/estimate-generator", "Estimate Generator"],
            ["/receipt-generator", "Receipt Generator"],
            ["/quote-generator", "Quote Generator"],
          ]}
        />
        <FooterCol
          title="Industries"
          links={[
            ["/invoice-generator/freelancer", "Freelancer Invoice"],
            ["/invoice-generator/restaurant", "Restaurant Invoice"],
            ["/invoice-generator/hotel-booking", "Hotel Invoice"],
            ["/invoice-generator/hospital", "Hospital Invoice"],
            ["/invoice-generator/it-service", "IT Service Invoice"],
            ["/invoice-generator/pakistan-fbr", "Pakistan Invoice"],
            ["/templates", "View all 30+ →"],
          ]}
        />
        <FooterCol
          title="Resources"
          links={[
            ["/guide", "Invoicing Guide"],
            ["/guide/what-is-an-invoice", "What is an invoice?"],
            ["/guide/how-to-write-an-invoice", "How to write an invoice"],
            ["/guide/payment-terms", "Payment terms"],
            ["/guide/pakistan-fbr-invoice", "FBR compliance"],
            ["/contact", "Help & Support"],
          ]}
        />
        <FooterCol title="Company & Legal" links={legalLinks} />
      </div>
      <div className="container-shell mt-10 flex flex-col justify-between gap-3 border-t border-[var(--border-default)] pt-6 text-sm text-[var(--text-secondary)] md:flex-row">
        <span>© 2026 InvoicelyPro. All rights reserved.</span>
        <span>Made with ❤️ for businesses worldwide</span>
        <span>🇺🇸 English · 🇵🇰 اردو · 🇸🇦 العربية</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <div className="space-y-2 text-sm">
        {links.map(([href, label]) => (
          <Link key={href + label} href={href} className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
