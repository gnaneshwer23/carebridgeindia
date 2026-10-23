import { connection } from "next/server";
import Link from "next/link";
import { listCases } from "@/lib/case-data";
import { labelFor, PROCEDURE_OPTIONS, STATUS_LABELS, CONCERN_OPTIONS } from "@/lib/labels";

export const instant = false;

export default async function QueuePage() {
  await connection();
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
  const rows = await listCases();
  return (
    <div className="grid gap-6">
      <h1 className="text-4xl">Cases</h1>
      {rows.length === 0 ? (
        <p>No enquiries yet. New enquiries appear here after someone sends the form.</p>
      ) : (
        <ul className="grid gap-3">
          {rows.map((row) => {
            const overdue = Boolean(row.responseDueOn && row.responseDueOn < today);
            return (
              <li key={row.id} className="rounded-xl border border-border bg-card px-4 py-4">
                <Link href={`/coordinator/cases/${row.id}`} className="grid gap-1">
                  <span className="font-medium">
                    {row.reference} · {STATUS_LABELS[row.status] ?? row.status}
                    {overdue ? " · Response overdue" : ""}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {labelFor(CONCERN_OPTIONS, row.concern)} · {labelFor(PROCEDURE_OPTIONS, row.procedure)} · {row.ownerName ?? "Unassigned"}
                  </span>
                  <span className="text-sm">{row.nextAction}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
