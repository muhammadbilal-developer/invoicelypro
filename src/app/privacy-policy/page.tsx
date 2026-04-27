import { StaticPage } from "@/components/layout/StaticPage";

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>We collect form data you enter for invoice generation and store it only in your browser localStorage.</p>
      <p>We do not send invoice data to servers unless you explicitly trigger actions like Email Invoice or AI Suggest.</p>
      <p>Cookies used: theme preference and language preference only.</p>
      <p>Third parties: Vercel analytics (anonymous) and Anthropic API only when AI Suggest is clicked.</p>
      <p>Users have GDPR and CCPA rights to access, correct, and request deletion of data.</p>
      <p>This service is not intended for children under 13.</p>
      <p>Last updated: April 27, 2026.</p>
    </StaticPage>
  );
}
