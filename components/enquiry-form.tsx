"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitEnquiry } from "@/lib/actions/enquiry";
import { idleState } from "@/lib/form";
import {
  CONCERN_OPTIONS,
  CONSENT_STATEMENT,
  DISCUSSED_OPTIONS,
  NATION_OPTIONS,
  PROCEDURE_OPTIONS,
  TIMEFRAME_OPTIONS,
  WAIT_KIND_OPTIONS,
} from "@/lib/labels";

const control =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-base md:text-base";

export function EnquiryForm({ defaultConcern }: { defaultConcern: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, idleState);
  return (
    <form action={action} className="grid gap-8" noValidate>
      {state.error ? (
        <p role="alert" className="rounded-lg border border-destructive px-4 py-3 text-sm">
          {state.error}
        </p>
      ) : null}

      <fieldset className="grid gap-4">
        <legend className="text-xl">Your main concern</legend>
        {CONCERN_OPTIONS.map((option) => (
          <label key={option.value} className="flex items-center gap-3">
            <input
              type="radio"
              name="concern"
              value={option.value}
              defaultChecked={option.value === defaultConcern}
              required
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <Field label="Procedure being considered" htmlFor="procedure">
        <select id="procedure" name="procedure" required className={control} defaultValue="hip">
          {PROCEDURE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Has a clinician recommended or discussed this procedure?"
        htmlFor="discussed"
      >
        <select id="discussed" name="discussed" required className={control} defaultValue="not_sure">
          {DISCUSSED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Where you are in the UK" htmlFor="nation">
          <select id="nation" name="nation" required className={control} defaultValue="england">
            {NATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="City or county" htmlFor="location" hint="Not your street address.">
          <Input id="location" name="location" required maxLength={80} className={control} />
        </Field>
      </div>

      <Field label="What do you know about the wait?" htmlFor="waitKind">
        <select id="waitKind" name="waitKind" required className={control} defaultValue="unknown">
          {WAIT_KIND_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label="Treatment date, estimate, or assumption"
        htmlFor="waitDetail"
        hint="Leave blank if you chose “I don't know”."
      >
        <Input id="waitDetail" name="waitDetail" maxLength={200} className={control} />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="UK private quote, in pounds" htmlFor="quoteAmount" hint="Optional. Leave blank if you do not have one.">
          <Input id="quoteAmount" name="quoteAmount" inputMode="decimal" className={control} />
        </Field>
        <Field label="Date of that quote" htmlFor="quoteDate">
          <Input id="quoteDate" name="quoteDate" type="date" className={control} />
        </Field>
      </div>

      <Field label="Preferred timeframe" htmlFor="timeframe">
        <select id="timeframe" name="timeframe" required className={control} defaultValue="Not sure">
          {TIMEFRAME_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" maxLength={120} className={control} />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" required autoComplete="email" className={control} />
        </Field>
        <Field label="Phone" htmlFor="phone" hint="Required only if you ask us to phone.">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className={control} />
        </Field>
        <Field label="How should we contact you?" htmlFor="preference">
          <select id="preference" name="preference" required className={control} defaultValue="email">
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </Field>
      </div>

      <fieldset className="grid gap-3 rounded-xl border border-border bg-card p-4">
        <legend className="px-1 text-base font-medium">How this enquiry is used</legend>
        <p className="text-sm leading-6">{CONSENT_STATEMENT}</p>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" required className="mt-1 size-4 accent-primary" />
          I understand and agree to this enquiry being stored for coordinator review.
        </label>
      </fieldset>

      <Button type="submit" disabled={pending} className="h-12 w-fit px-5 text-base">
        {pending ? "Sending the enquiry" : "Send my enquiry"}
      </Button>
    </form>
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
