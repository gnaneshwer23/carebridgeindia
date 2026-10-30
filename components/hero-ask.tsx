"use client";

import { Mic, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { openCareBridgeChat } from "@/components/site-chat";

export function HeroAsk() {
  const [value, setValue] = useState("");

  function open(prompt?: string) {
    openCareBridgeChat(prompt?.trim() || value.trim() || undefined);
  }

  return (
    <div className="mt-10 max-w-xl rounded-[1.4rem] border border-line/90 bg-white/85 p-3 shadow-[0_18px_50px_-36px_rgba(15,44,52,0.55)] backdrop-blur-sm">
      <p className="px-2 pt-1 text-sm font-medium text-deep/70">Ask CareBridge</p>
      <form
        className="mt-2 flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          open();
          setValue("");
        }}
      >
        <label className="sr-only" htmlFor="hero-ask">
          Ask about wait and cost comparison
        </label>
        <textarea
          id="hero-ask"
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="I’ve waited months on the NHS — how does the India comparison work?"
          className="min-h-[3.25rem] flex-1 resize-none rounded-xl border border-transparent bg-paper px-3 py-2.5 text-base text-deep outline-none focus-visible:border-teal"
        />
        <button
          type="button"
          onClick={() => open(value || "How does CareBridge work?")}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-deep transition-[transform,background-color] duration-200 ease-out hover:bg-mist active:scale-[0.97]"
          aria-label="Open chat with voice"
          title="Open chat to type or dictate"
        >
          <Mic className="size-5" />
        </button>
        <button
          type="submit"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal text-white transition-[transform,background-color] duration-200 ease-out hover:bg-teal-deep active:scale-[0.97]"
          aria-label="Open chat"
        >
          <SendHorizontal className="size-5" />
        </button>
      </form>
      <p className="mt-2 px-2 pb-1 text-xs leading-relaxed text-deep/55">
        Guidance only — not prices, diagnoses, or a booking. WhatsApp for a human.
      </p>
    </div>
  );
}
