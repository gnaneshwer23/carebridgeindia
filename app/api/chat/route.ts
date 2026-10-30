import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { CAREBRIDGE_CHAT_INSTRUCTIONS } from "@/lib/chat/prompt";
import { fallbackReply } from "@/lib/chat/fallback";

export const maxDuration = 30;

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role !== "user") continue;
    const text = message.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim();
    if (text) return text;
  }
  return "";
}

function streamPlainText(text: string) {
  const id = `text-${crypto.randomUUID()}`;
  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute({ writer }) {
        writer.write({ type: "start" });
        writer.write({ type: "text-start", id });
        writer.write({ type: "text-delta", id, delta: text });
        writer.write({ type: "text-end", id });
      },
    }),
  });
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const userText = lastUserText(messages);

  if (!userText) {
    return streamPlainText(
      "Ask about how CareBridge works, waits, costs, or how to enquire. I will not invent prices or clinical advice.",
    );
  }

  const hasGatewayKey = Boolean(process.env.AI_GATEWAY_API_KEY?.trim());

  if (!hasGatewayKey) {
    return streamPlainText(fallbackReply(userText));
  }

  try {
    const result = streamText({
      model: "openai/gpt-5.4-mini",
      instructions: CAREBRIDGE_CHAT_INSTRUCTIONS,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 500,
      temperature: 0.3,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch {
    return streamPlainText(
      `${fallbackReply(userText)}\n\n(Assistant model temporarily unavailable — showing guided reply.)`,
    );
  }
}
