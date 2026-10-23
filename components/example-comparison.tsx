const rows = [
  ["Procedure package", "£16,000", "£7,500"],
  ["Tests outside the package", "Included", "£300"],
  ["Travel and transfers", "£100", "£1,100"],
  ["Accommodation", "£0", "£900"],
  ["Rehabilitation and follow-up", "£600", "£800"],
  ["Coordination fee", "£0", "£400"],
  ["Expected total", "£16,700", "£11,000"],
];

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
      <p className="mt-2 text-base leading-relaxed text-[#3a5560]">
        Fictional figures for layout only. Not a provider quote and not a guaranteed saving.
      </p>
      <dl className="mt-5 grid gap-3">
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
      <p className="mt-4 text-base leading-relaxed">
        Availability: UK treatment date not supplied. India treatment window awaiting provider confirmation. A consultation date is not shown, because it is not a treatment date.
      </p>
      <a
        href="#breakdown"
        className="mt-5 inline-flex h-12 items-center justify-center rounded-[16px] bg-[#0B6B70] px-5 text-base font-semibold text-white"
      >
        View full breakdown
      </a>
    </aside>
  );
}

export function FullBreakdown() {
  return (
    <section id="breakdown" className="rounded-[16px] border border-[#D7E3E8] bg-white p-5 md:p-6" aria-labelledby="example-comparison-title">
      <p className="text-sm font-semibold text-[#0B6B70]">Demonstration data</p>
      <h2 id="example-comparison-title" className="mt-1 font-serif text-3xl">Full breakdown</h2>
      <p className="mt-2 text-base leading-relaxed text-[#3a5560]">
        Fictional figures for layout only. Not a quote and not a provider. Unknown costs are not part of this layout example.
      </p>
      <table className="mt-4 w-full text-left text-base">
        <caption className="sr-only">Fictional UK and India costs for a layout example</caption>
        <thead>
          <tr className="border-b border-[#D7E3E8] text-[#3a5560]">
            <th scope="col" className="py-2 font-medium">Item</th>
            <th scope="col" className="py-2 font-medium">UK example</th>
            <th scope="col" className="py-2 font-medium">India example</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([item, uk, india]) => (
            <tr key={item} className="border-b border-[#D7E3E8] last:border-0">
              <th scope="row" className="py-3 pr-3 font-medium">{item}</th>
              <td className="py-3 pr-3">{uk}</td>
              <td className="py-3">{india}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-base leading-relaxed">
        Example difference £5,700. This is not a guaranteed saving. Complications and extra nights are not included.
      </p>
    </section>
  );
}
