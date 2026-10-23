"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveProvider } from "@/lib/actions/providers";
import { idleState } from "@/lib/form";
import {
  REQUIRED_CREDENTIAL_CHECKS,
  type CredentialCheckType,
} from "@/lib/provider-checks";

const control =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-base md:text-base";

export function ProviderForm({
  provider,
}: {
  provider: {
    id: string;
    name: string;
    country: string;
    clinicianName: string;
    registrationBody: string;
    registrationNumber: string;
    approvedForLiveCases: boolean;
    notes: Partial<Record<CredentialCheckType, string>>;
  } | null;
}) {
  const [state, action, pending] = useActionState(saveProvider, idleState);
  return (
    <form action={action} className="grid gap-8">
      {provider ? <input type="hidden" name="providerId" value={provider.id} /> : null}
      {state.error ? (
        <p role="alert" className="rounded-lg border border-destructive px-4 py-3 text-sm">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Provider</Label>
          <Input id="name" name="name" required defaultValue={provider?.name} className={control} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" defaultValue={provider?.country ?? "India"} className={control} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="clinicianName">Named clinician</Label>
          <Input
            id="clinicianName"
            name="clinicianName"
            required
            defaultValue={provider?.clinicianName}
            className={control}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="registrationBody">Registration body</Label>
          <Input
            id="registrationBody"
            name="registrationBody"
            defaultValue={provider?.registrationBody}
            className={control}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="registrationNumber">Registration number</Label>
          <Input
            id="registrationNumber"
            name="registrationNumber"
            defaultValue={provider?.registrationNumber}
            className={control}
          />
        </div>
      </div>

      <section className="grid gap-4">
        <div className="grid gap-2">
          <h2 className="text-2xl">Credential checks</h2>
          <p className="text-sm text-muted-foreground">
            Records are not uploaded on this screen. Document exchange still needs a storage decision. Write what was checked; a check counts only when the note is saved.
          </p>
        </div>
        {REQUIRED_CREDENTIAL_CHECKS.map((check) => (
          <div key={check.type} className="grid gap-2">
            <Label htmlFor={check.type}>{check.label}</Label>
            <p className="text-sm text-muted-foreground">{check.hint}</p>
            <Textarea
              id={check.type}
              name={check.type}
              defaultValue={provider?.notes[check.type] ?? ""}
              className="min-h-20 bg-card text-base"
            />
          </div>
        ))}
      </section>

      <section className="grid gap-3 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-2xl">Live cases</h2>
        <p className="rounded-lg bg-secondary px-4 py-3 text-sm">
          {provider?.approvedForLiveCases
            ? "This provider is marked approved for live cases."
            : "This provider is not approved for live cases. Saving a proposal does not reserve treatment."}
        </p>
        <label className="flex items-start gap-2 text-sm" htmlFor="confirmLive">
          <input
            id="confirmLive"
            name="confirmLive"
            type="checkbox"
            defaultChecked={provider?.approvedForLiveCases ?? false}
            className="mt-1 size-4 accent-primary"
          />
          <span>
            I confirm this provider may be used for live cases. Approval stays off until every check above is recorded and this box is ticked.
          </span>
        </label>
      </section>

      <Button type="submit" disabled={pending} className="h-11 w-fit px-4">
        {pending ? "Saving" : "Save provider"}
      </Button>
    </form>
  );
}
