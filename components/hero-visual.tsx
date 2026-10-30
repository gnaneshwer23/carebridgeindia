import { BridgeCanvas } from "@/components/visuals/bridge-canvas";

export function HeroVisual() {
  return (
    <div
      className="relative isolate min-h-[300px] overflow-hidden rounded-[28px] cb-hero-plane md:min-h-[440px]"
      role="img"
      aria-label="Abstract bridge connecting a UK wait and cost picture with a provider-confirmed India proposal."
    >
      <BridgeCanvas className="absolute inset-0 opacity-90" />

      <div className="pointer-events-none relative z-10 flex h-full min-h-[300px] flex-col justify-between p-7 md:min-h-[440px] md:p-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-aqua/70">UK → INDIA</p>
          <p className="mt-3 max-w-[15rem] font-serif text-3xl leading-tight text-white md:text-4xl">
            Wait and cost, side by side.
          </p>
        </div>
        <div className="grid max-w-xs gap-2 text-sm text-aqua/85">
          <p className="border-l border-aqua/35 pl-3">Provider-confirmed window</p>
          <p className="border-l border-aqua/35 pl-3">Total expected journey cost</p>
          <p className="border-l border-aqua/35 pl-3">Deciding not to travel is valid</p>
        </div>
      </div>
    </div>
  );
}
