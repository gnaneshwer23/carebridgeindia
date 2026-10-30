export function CompactExample() {
  return (
    <aside
      className="relative overflow-hidden rounded-2xl border border-line bg-white/95 p-6 md:p-8"
      aria-labelledby="compact-example-title"
    >
      <p className="text-sm font-semibold tracking-wide text-teal">Demonstration data</p>
      <h2 id="compact-example-title" className="mt-1 font-serif text-3xl tracking-tight text-deep">
        Example comparison
      </h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-deep/80">
        Fictional figures for layout only. Not a provider quote and not a guaranteed saving.
      </p>
      <dl className="mt-7 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-aqua px-5 py-4">
          <dt className="text-sm text-deep/70">Example UK total</dt>
          <dd className="mt-1 font-serif text-4xl tracking-tight text-deep">£16,700</dd>
        </div>
        <div className="rounded-2xl bg-mist px-5 py-4">
          <dt className="text-sm text-deep/70">Example India journey total</dt>
          <dd className="mt-1 font-serif text-4xl tracking-tight text-deep">£11,000</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-1 md:col-span-2">
          <dt className="text-base text-deep/80">Example difference</dt>
          <dd className="text-lg font-semibold text-deep">£5,700</dd>
        </div>
      </dl>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-deep/80">
        Availability: UK treatment date not supplied. India treatment window awaiting provider confirmation.
        A consultation date is not shown, because it is not a treatment date.
      </p>
    </aside>
  );
}
