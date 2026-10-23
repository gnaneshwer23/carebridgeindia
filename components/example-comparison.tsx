const rows = [
  ["Procedure package", "£16,000", "£7,500"],
  ["Tests outside the package", "Included", "£300"],
  ["Travel and transfers", "£100", "£1,100"],
  ["Accommodation", "£0", "£900"],
  ["Rehabilitation and follow-up", "£600", "£800"],
  ["Coordination fee", "£0", "£400"],
  ["Expected total", "£16,700", "£11,000"],
];

export function ExampleComparison() {
  return (
    <aside
      id="example"
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      aria-labelledby="example-comparison-title"
    >
      <p className="text-sm font-medium text-primary">Fictional</p>
      <h2 id="example-comparison-title" className="mt-1 text-2xl">
        Example comparison
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Fictional figures for layout only. Not a quote and not a provider.
      </p>
      <table className="mt-4 w-full text-left text-sm">
        <caption className="sr-only">
          Fictional UK and India costs for a layout example
        </caption>
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th scope="col" className="py-2 font-medium">Item</th>
            <th scope="col" className="py-2 font-medium">UK example</th>
            <th scope="col" className="py-2 font-medium">India example</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([item, uk, india]) => (
            <tr key={item} className="border-b border-border last:border-0">
              <th scope="row" className="py-2 pr-3 font-medium">{item}</th>
              <td className="py-2 pr-3">{uk}</td>
              <td className="py-2">{india}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm leading-6">
        Example difference £5,700. This is not a guaranteed saving. Complications and extra nights are not included.
      </p>
      <ul className="mt-3 grid gap-2 text-sm leading-6">
        <li>UK treatment date: not supplied in this example.</li>
        <li>
          India treatment window: awaiting provider confirmation. A consultation date is not shown here, because it is not a treatment date.
        </li>
      </ul>
    </aside>
  );
}
