import { connection } from "next/server";
import Link from "next/link";
import { listProviders } from "@/lib/provider-data";
import { REQUIRED_CREDENTIAL_CHECKS } from "@/lib/provider-checks";

export const instant = false;

export default async function ProvidersPage() {
  await connection();
  const rows = await listProviders();
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="text-4xl">Providers</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Credential records stay in this workspace. Public pages do not list provider names or prices. Records are not uploaded here yet.
          </p>
        </div>
        <Link href="/coordinator/providers/new" className="text-sm font-medium underline">
          Add a provider
        </Link>
      </div>
      {rows.length === 0 ? (
        <p>No providers yet. Add a hospital and a named clinician before a live case can be considered.</p>
      ) : (
        <ul className="grid gap-3">
          {rows.map(({ provider, clinician, recordedCount }) => (
            <li key={provider.id}>
              <Link
                href={`/coordinator/providers/${provider.id}`}
                className="grid gap-2 rounded-2xl border border-border bg-card p-5"
              >
                <span className="text-xl font-medium">{provider.name}</span>
                <span className="text-sm">
                  {provider.country}
                  {clinician ? ` · ${clinician.name}` : " · No named clinician"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {provider.approvedForLiveCases
                    ? "Approved for live cases"
                    : "Not approved for live cases"}
                  {` · ${recordedCount} of ${REQUIRED_CREDENTIAL_CHECKS.length} checks recorded`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
