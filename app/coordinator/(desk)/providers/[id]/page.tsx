import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProviderForm } from "@/components/provider-form";
import { getProviderRecord } from "@/lib/provider-data";
import { missingCredentialChecks } from "@/lib/provider-checks";

export const instant = false;

export default async function ProviderPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ needsChecks?: string }>;
}) {
  await connection();
  const { id } = await props.params;
  const { needsChecks } = await props.searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const record = await getProviderRecord(id);
  if (!record) notFound();
  const missing = missingCredentialChecks(record.notes);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Link href="/coordinator/providers" className="text-sm underline">
          Providers
        </Link>
        <h1 className="text-4xl">{record.provider.name}</h1>
      </div>
      {needsChecks && missing.length > 0 ? (
        <p role="alert" className="rounded-lg border border-destructive px-4 py-3 text-sm">
          {`Record every credential check before confirming this provider for live cases. Still needed: ${missing.map((check) => check.label).join(", ")}.`}
        </p>
      ) : null}
      <ProviderForm
        provider={{
          id: record.provider.id,
          name: record.provider.name,
          country: record.provider.country,
          clinicianName: record.clinician?.name ?? "",
          registrationBody: record.clinician?.registrationBody ?? "",
          registrationNumber: record.clinician?.registrationNumber ?? "",
          approvedForLiveCases: record.provider.approvedForLiveCases,
          notes: record.notes,
        }}
      />
    </div>
  );
}
