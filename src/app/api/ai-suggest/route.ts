import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { description, currency } = await req.json();
  if (!description) return Response.json([], { status: 200 });

  const msg = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: `Convert this work description into invoice line items. Return ONLY a JSON array of objects with keys: description (string), quantity (number), rate (number in ${currency || "USD"}). No commentary.\n\nWork: ${description}`,
      },
    ],
  });

  const text = msg.content[0]?.type === "text" ? msg.content[0].text : "[]";
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    return Response.json(JSON.parse(clean));
  } catch {
    return Response.json([]);
  }
}
