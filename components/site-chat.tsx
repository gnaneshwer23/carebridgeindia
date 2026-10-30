"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, Mic, MicOff, SendHorizontal, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type SpeechRecognitionResultLike = {
  readonly isFinal: boolean;
  readonly 0: { readonly transcript: string };
};

type SpeechRecognitionEventLike = {
  readonly resultIndex: number;
  readonly results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text as string)
    .join("");
}

const starter = [
  "How does CareBridge work?",
  "What about NHS waits?",
  "How are costs compared?",
];

export function SiteChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speakReplies, setSpeakReplies] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastSpokenId = useRef<string | null>(null);

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    setVoiceSupported(Boolean(getSpeechRecognition()));
  }, []);

  const onOpenChat = useEffectEvent((detail?: { prompt?: string }) => {
    setOpen(true);
    if (detail?.prompt?.trim()) {
      setInput(detail.prompt.trim());
    }
  });

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ prompt?: string }>;
      onOpenChat(custom.detail);
    };
    window.addEventListener("carebridge:open-chat", handler);
    return () => window.removeEventListener("carebridge:open-chat", handler);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!speakReplies || typeof window === "undefined" || !window.speechSynthesis) return;
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    if (!last || last.id === lastSpokenId.current || status === "streaming") return;
    const text = messageText(last.parts).trim();
    if (!text) return;
    lastSpokenId.current = last.id;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }, [messages, speakReplies, status]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  function submitText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function toggleListen() {
    const Ctor = getSpeechRecognition();
    if (!Ctor) return;

    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-GB";
    recognition.onresult = (event) => {
      let finalText = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interim += result[0].transcript;
      }
      if (finalText) {
        setInput((prev) => `${prev ? `${prev} ` : ""}${finalText}`.trim());
      } else if (interim) {
        setInput((prev) => {
          const base = prev.replace(/\s*…$/, "").trim();
          return `${base}${base ? " " : ""}${interim}…`;
        });
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => {
      setListening(false);
      setInput((prev) => prev.replace(/\s*…$/, "").trim());
    };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      {open ? (
        <section
          className="pointer-events-auto flex h-[min(34rem,78vh)] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.35rem] border border-line/90 bg-paper shadow-[0_24px_60px_-28px_rgba(15,44,52,0.55)]"
          aria-label="CareBridge assistant"
        >
          <header className="flex items-start justify-between gap-3 border-b border-line/80 bg-ink px-4 py-3.5 text-aqua">
            <div>
              <p className="font-serif text-xl leading-none text-white">CareBridge Assist</p>
              <p className="mt-1.5 text-xs leading-relaxed text-aqua/75">
                Text or voice guidance. No invented prices or clinical advice.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                stop();
                setOpen(false);
              }}
              className="rounded-lg p-1.5 text-aqua/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </button>
          </header>

          <div className="flex items-center justify-between gap-2 border-b border-line bg-mist/70 px-4 py-2 text-sm">
            <a
              href={whatsappHref("Hello CareBridge — I’d like to talk through a UK–India comparison.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal underline-offset-2 hover:underline"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => {
                setSpeakReplies((v) => {
                  if (v && typeof window !== "undefined") window.speechSynthesis?.cancel();
                  return !v;
                });
              }}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-deep/70 transition-colors hover:bg-white hover:text-deep"
              aria-pressed={speakReplies}
              title={speakReplies ? "Mute spoken replies" : "Speak replies aloud"}
            >
              {speakReplies ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              <span className="sr-only">{speakReplies ? "Mute replies" : "Speak replies"}</span>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[0.95rem] leading-relaxed">
            {messages.length === 0 ? (
              <div className="space-y-3 text-deep/85">
                <p>
                  Ask how the pathway works, what wait and cost pages cover, or how to start a
                  comparison. For a person, use WhatsApp.
                </p>
                <div className="flex flex-wrap gap-2">
                  {starter.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => submitText(prompt)}
                      className="rounded-full border border-line bg-white px-3 py-1.5 text-left text-sm text-deep transition-[transform,background-color] duration-200 ease-out hover:bg-mist active:scale-[0.98]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((message) => {
              const text = messageText(message.parts);
              if (!text) return null;
              const mine = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={cn("flex", mine ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[92%] rounded-2xl px-3.5 py-2.5 whitespace-pre-wrap",
                      mine ? "bg-teal text-white" : "border border-line bg-white text-deep",
                    )}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {busy ? (
              <p className="text-sm text-deep/55" aria-live="polite">
                Thinking…
              </p>
            ) : null}
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                Something went wrong. Try again, or WhatsApp us.
              </p>
            ) : null}
          </div>

          <form
            className="border-t border-line bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              submitText(input.replace(/\s*…$/, ""));
            }}
          >
            <div className="flex items-end gap-2">
              {voiceSupported ? (
                <button
                  type="button"
                  onClick={toggleListen}
                  className={cn(
                    "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border transition-[transform,background-color,border-color] duration-200 ease-out active:scale-[0.97]",
                    listening
                      ? "border-teal bg-mist text-teal"
                      : "border-line bg-paper text-deep hover:bg-mist",
                  )}
                  aria-pressed={listening}
                  aria-label={listening ? "Stop voice input" : "Start voice input"}
                >
                  {listening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                </button>
              ) : null}
              <label className="sr-only" htmlFor="carebridge-chat-input">
                Message
              </label>
              <textarea
                id="carebridge-chat-input"
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy}
                placeholder={listening ? "Listening…" : "Type a question…"}
                className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-line bg-paper px-3 py-2.5 text-deep outline-none focus-visible:border-teal"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitText(input.replace(/\s*…$/, ""));
                  }
                }}
              />
              <button
                type="submit"
                disabled={busy || !input.replace(/\s*…$/, "").trim()}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal text-white transition-[transform,background-color] duration-200 ease-out hover:bg-teal-deep active:scale-[0.97] disabled:opacity-40"
                aria-label="Send message"
              >
                <SendHorizontal className="size-5" />
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto inline-flex h-14 items-center gap-2 rounded-full bg-teal px-5 text-base font-semibold text-white shadow-[0_16px_40px_-18px_rgba(11,107,112,0.9)] transition-[transform,background-color] duration-200 ease-out hover:bg-teal-deep active:scale-[0.97]"
        aria-expanded={open}
        aria-controls={open ? undefined : undefined}
        aria-label={open ? "Close CareBridge chat" : "Open CareBridge chat"}
      >
        <MessageCircle className="size-5" />
        <span className="pr-0.5">{open ? "Close" : "Ask CareBridge"}</span>
      </button>
    </div>
  );
}

export function openCareBridgeChat(prompt?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("carebridge:open-chat", { detail: prompt ? { prompt } : undefined }),
  );
}
