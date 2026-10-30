export function HeroVisual() {
  return (
    <div
      className="relative isolate min-h-[280px] overflow-hidden rounded-[28px] cb-hero-plane md:min-h-[420px]"
      aria-hidden="true"
    >
      <div className="cb-drift absolute -inset-[12%] opacity-70">
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-[12%] right-[10%] h-52 w-52 rounded-full bg-lagoon/40 blur-3xl" />
        <div className="absolute left-[42%] top-[48%] h-24 w-64 -rotate-12 rounded-full bg-white/5" />
      </div>

      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 640 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M72 340 C180 220, 260 210, 320 250 C390 300, 450 180, 568 150"
          stroke="rgba(238,248,252,0.55)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        <circle cx="72" cy="340" r="5" fill="#EEF8FC" />
        <circle cx="568" cy="150" r="5" fill="#EEF8FC" />
      </svg>

      <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-7 text-aqua md:min-h-[420px] md:p-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-aqua/70">UK → INDIA</p>
          <p className="mt-3 max-w-[14rem] font-serif text-3xl leading-tight text-white md:text-4xl">
            Wait and cost, side by side.
          </p>
        </div>
        <div className="grid max-w-sm gap-3 text-sm leading-relaxed text-aqua/85">
          <p className="border-l border-aqua/35 pl-3">
            Your NHS wait estimate or UK private quote beside a provider-confirmed India window and total expected cost.
          </p>
          <p className="border-l border-aqua/35 pl-3">
            Incomplete figures stay incomplete. Deciding not to travel is a valid outcome.
          </p>
        </div>
      </div>
    </div>
  );
}
