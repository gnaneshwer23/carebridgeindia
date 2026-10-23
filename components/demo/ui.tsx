import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const primaryBtn = cn(
  buttonVariants({ size: "lg" }),
  "h-12 rounded-[16px] px-5 text-base font-semibold",
);

export const secondaryBtn = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-12 rounded-[16px] border-[#D7E3E8] bg-white px-5 text-base font-semibold text-[#12333D]",
);

export function DemoBanner({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-[16px] border border-[#D7E3E8] bg-white px-4 py-3 text-base leading-relaxed text-[#12333D]">
      <strong className="font-semibold">Demonstration. </strong>
      {children}
    </p>
  );
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-[16px] border border-[#D7E3E8] bg-white p-5 md:p-6", className)}>
      {children}
    </section>
  );
}
