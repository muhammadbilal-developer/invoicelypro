import { Resend } from "resend";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  if (!process.env.RESEND_API_KEY) {
    return Response.json({
      fallback: `mailto:hello@invoicelypro.com?subject=${encodeURIComponent(subject || "Contact form")}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`,
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "InvoicelyPro <noreply@invoicelypro.com>",
    to: ["hello@invoicelypro.com"],
    subject: subject || "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  return Response.json({ ok: true });
}
