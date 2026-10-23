"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveProposal } from "@/lib/actions/staff";
import {
  COST_CATEGORY_LABELS,
  REQUIRED_COST_CATEGORIES,
  RESPONSIBILITY_KINDS,
  RESPONSIBILITY_LABELS,
  type CostCategory,
} from "@/lib/comparison";
import { idleState } from "@/lib/form";
import type { ProposalDraft } from "@/lib/present";

const control =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-base md:text-base";

export function ProposalEditor({
  caseId,
  draft,
}: {
  caseId: string;
  draft: ProposalDraft | null;
}) {
  const [state, action, pending] = useActionState(saveProposal, idleState);
  const line = (category: string) => draft?.lines.find((item) => item.category === category);
  const duty = (kind: string) => draft?.responsibilities[kind];

  return (
    <form action={action} className="grid gap-8">
      <input type="hidden" name="caseId" value={caseId} />
      {draft ? <input type="hidden" name="proposalId" value={draft.id} /> : null}
      {state.error ? (
        <p role="alert" className="rounded-lg border border-destructive px-4 py-3 text-sm">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Exact procedure" htmlFor="procedureExact">
          <Input id="procedureExact" name="procedureExact" defaultValue={draft?.procedureExact} className={control} />
        </Field>
        <Field label="Laterality" htmlFor="laterality">
          <select id="laterality" name="laterality" defaultValue={draft?.laterality || "not_supplied"} className={control}>
            <option value="not_supplied">Not supplied</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="bilateral">Bilateral</option>
          </select>
        </Field>
      </div>
      <Field label="Package specification" htmlFor="packageSpec">
        <Textarea id="packageSpec" name="packageSpec" defaultValue={draft?.packageSpec} className="min-h-24 bg-card text-base" />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Hospital" htmlFor="providerName">
          <Input id="providerName" name="providerName" defaultValue={draft?.providerName} className={control} />
        </Field>
        <Field label="Hospital registration notes" htmlFor="registrationNotes">
          <Input id="registrationNotes" name="registrationNotes" defaultValue={draft?.registrationNotes} className={control} />
        </Field>
        <Field label="Named clinician" htmlFor="clinicianName">
          <Input id="clinicianName" name="clinicianName" defaultValue={draft?.clinicianName} className={control} />
        </Field>
        <Field label="Registration body" htmlFor="registrationBody">
          <Input id="registrationBody" name="registrationBody" defaultValue={draft?.registrationBody} className={control} />
        </Field>
        <Field label="Registration number" htmlFor="registrationNumber">
          <Input id="registrationNumber" name="registrationNumber" defaultValue={draft?.registrationNumber} className={control} />
        </Field>
        <Field label="Currency" htmlFor="currency">
          <select id="currency" name="currency" defaultValue={draft?.currency || "GBP"} className={control}>
            <option>GBP</option>
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </Field>
        <Field label="Pounds per 1 unit of that currency" htmlFor="gbpPerUnit" hint="Leave blank when the proposal is already in pounds.">
          <Input id="gbpPerUnit" name="gbpPerUnit" defaultValue={draft?.gbpPerUnit} className={control} />
        </Field>
        <Field label="Exchange-rate date" htmlFor="exchangeRateOn">
          <Input id="exchangeRateOn" name="exchangeRateOn" type="date" defaultValue={draft?.exchangeRateOn} className={control} />
        </Field>
        <Field label="Rate source" htmlFor="exchangeRateLabel">
          <Input id="exchangeRateLabel" name="exchangeRateLabel" defaultValue={draft?.exchangeRateLabel} className={control} />
        </Field>
        <Field label="Quote expiry" htmlFor="expiresOn">
          <Input id="expiresOn" name="expiresOn" type="date" defaultValue={draft?.expiresOn} className={control} />
        </Field>
      </div>

      <fieldset className="grid gap-4">
        <legend className="text-xl">Costs</legend>
        <p className="text-sm text-muted-foreground">
          Mark a line “Not supplied” when the provider has not priced it. Do not enter zero unless the cost is genuinely not charged.
        </p>
        {REQUIRED_COST_CATEGORIES.map((category) => {
          const current = line(category);
          return (
            <div key={category} className="grid gap-3 border-t border-border pt-3 md:grid-cols-[1fr_10rem_10rem]">
              <Field label={COST_CATEGORY_LABELS[category as CostCategory]} htmlFor={`${category}_label`}>
                <Input
                  id={`${category}_label`}
                  name={`${category}_label`}
                  defaultValue={current?.label || COST_CATEGORY_LABELS[category as CostCategory]}
                  className={control}
                />
              </Field>
              <Field label="Amount" htmlFor={`${category}_amount`}>
                <Input
                  id={`${category}_amount`}
                  name={`${category}_amount`}
                  inputMode="decimal"
                  defaultValue={current?.amount}
                  className={control}
                />
              </Field>
              <Field label="Status" htmlFor={`${category}_certainty`}>
                <select
                  id={`${category}_certainty`}
                  name={`${category}_certainty`}
                  defaultValue={current?.certainty || "unknown"}
                  className={control}
                >
                  <option value="unknown">Not supplied</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="estimated">Estimate</option>
                </select>
              </Field>
            </div>
          );
        })}
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="text-xl">UK comparison figure</legend>
        <Field label="Source" htmlFor="ukSource">
          <select id="ukSource" name="ukSource" defaultValue={draft?.ukSource || ""} className={control}>
            <option value="">None</option>
            <option value="patient_quote">The person’s own UK quote</option>
            <option value="published_benchmark">A published benchmark</option>
          </select>
        </Field>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Amount in pounds" htmlFor="ukAmount">
            <Input id="ukAmount" name="ukAmount" defaultValue={draft?.ukAmount} className={control} />
          </Field>
          <Field label="Benchmark name" htmlFor="ukBenchmarkLabel">
            <Input id="ukBenchmarkLabel" name="ukBenchmarkLabel" defaultValue={draft?.ukBenchmarkLabel} className={control} />
          </Field>
          <Field label="Benchmark date" htmlFor="ukBenchmarkDate">
            <Input id="ukBenchmarkDate" name="ukBenchmarkDate" type="date" defaultValue={draft?.ukBenchmarkDate} className={control} />
          </Field>
        </div>
      </fieldset>

      <Window title="Consultation availability" prefix="consult" value={draft?.consultation ?? null} />
      <Window title="Treatment window" prefix="treat" value={draft?.treatment ?? null} />

      <fieldset className="grid gap-4">
        <legend className="text-xl">Terms and uncertainty</legend>
        <Area name="cancellationTerms" label="Cancellation terms" defaultValue={draft?.cancellationTerms} />
        <Area name="paymentRecipient" label="Who is paid" defaultValue={draft?.paymentRecipient} />
        <Area name="exclusions" label="Exclusions" defaultValue={draft?.exclusions} />
        <Area name="unpricedItems" label="Unpriced items" defaultValue={draft?.unpricedItems} />
        <Area name="contingency" label="Contingency scenario" defaultValue={draft?.contingency} />
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="text-xl">Responsibilities</legend>
        {RESPONSIBILITY_KINDS.map((kind) => (
          <div key={kind} className="grid gap-3 border-t border-border pt-3 md:grid-cols-3">
            <Field label={RESPONSIBILITY_LABELS[kind]} htmlFor={`${kind}_party`}>
              <Input id={`${kind}_party`} name={`${kind}_party`} defaultValue={duty(kind)?.party} placeholder="Named party" className={control} />
            </Field>
            <Field label="Contact" htmlFor={`${kind}_contact`}>
              <Input id={`${kind}_contact`} name={`${kind}_contact`} defaultValue={duty(kind)?.contact} className={control} />
            </Field>
            <Field label="What they do" htmlFor={`${kind}_description`}>
              <Input id={`${kind}_description`} name={`${kind}_description`} defaultValue={duty(kind)?.description} className={control} />
            </Field>
          </div>
        ))}
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" name="intent" value="save" disabled={pending} className="h-11 px-4">
          Save draft
        </Button>
        <Button type="submit" name="intent" value="publish" variant="secondary" disabled={pending} className="h-11 px-4">
          Publish to the person
        </Button>
      </div>
    </form>
  );
}

function Window({
  title,
  prefix,
  value,
}: {
  title: string;
  prefix: "consult" | "treat";
  value: ProposalDraft["consultation"];
}) {
  return (
    <fieldset className="grid gap-4">
      <legend className="text-xl">{title}</legend>
      <p className="text-sm text-muted-foreground">Leave the source blank if this has not been confirmed.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Source" htmlFor={`${prefix}_source`}>
          <Input id={`${prefix}_source`} name={`${prefix}_source`} defaultValue={value?.source} className={control} />
        </Field>
        <Field label="Confirmation date" htmlFor={`${prefix}_confirmedOn`}>
          <Input id={`${prefix}_confirmedOn`} name={`${prefix}_confirmedOn`} type="date" defaultValue={value?.confirmedOn} className={control} />
        </Field>
        <Field label="Window start" htmlFor={`${prefix}_start`}>
          <Input id={`${prefix}_start`} name={`${prefix}_start`} type="date" defaultValue={value?.windowStart ?? ""} className={control} />
        </Field>
        <Field label="Window end" htmlFor={`${prefix}_end`}>
          <Input id={`${prefix}_end`} name={`${prefix}_end`} type="date" defaultValue={value?.windowEnd ?? ""} className={control} />
        </Field>
      </div>
      <Area name={`${prefix}_conditions`} label="Conditions" defaultValue={value?.conditions} />
      <Area name={`${prefix}_dependencies`} label="Dependencies" defaultValue={value?.dependencies} />
    </fieldset>
  );
}

function Area({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <Field label={label} htmlFor={name}>
      <Textarea id={name} name={name} defaultValue={defaultValue} className="min-h-20 bg-card text-base" />
    </Field>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
