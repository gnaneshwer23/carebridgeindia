export function CompactExample() {
  return (
    <aside
      className="relative rounded-[16px] border border-[#D7E3E8] bg-white p-6 shadow-[0_16px_40px_rgba(18,51,61,0.08)]"
      aria-labelledby="compact-example-title"
    >
      <p className="text-sm font-semibold text-[#0B6B70]">Demonstration data</p>
      <h2 id="compact-example-title" className="mt-1 font-serif text-2xl text-[#12333D]">
        Example comparison
      </h2>
      <p className="mt-2 text-base leading-relaxed text-[#12333D]">
        Fictional figures for layout only. Not a provider quote and not a guaranteed saving.
      </p>
      <dl className="mt-6 grid gap-3">
        <div className="flex items-baseline justify-between gap-4 rounded-[12px] bg-[#EEF8FC] px-4 py-3">
          <dt className="text-base">Example UK total</dt>
          <dd className="font-serif text-3xl">£16,700</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 rounded-[12px] bg-[#EEF8FC] px-4 py-3">
          <dt className="text-base">Example India journey total</dt>
          <dd className="font-serif text-3xl">£11,000</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-1">
          <dt className="text-base">Example difference</dt>
          <dd className="text-base font-semibold">£5,700</dd>
        </div>
      </dl>
      <p className="mt-5 text-base leading-relaxed">
        Availability: UK treatment date not supplied. India treatment window awaiting provider confirmation. A consultation date is not shown, because it is not a treatment date.
      </p>
    </aside>
  );
}
