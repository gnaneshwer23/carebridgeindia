"use client";

import { useActionState, useRef, useState } from "react";
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
  "h-12 w-full rounded-2xl border border-input bg-card px-3 text-base md:text-base";

export function EnquiryForm({ defaultConcern }: { defaultConcern: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, idleState);
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState(defaultConcern);
  const [preference, setPreference] = useState("email");
  const [localError, setLocalError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const showWait = concern === "time" || concern === "both";
  const showQuote = concern === "cost" || concern === "both";

  function move(next: number) {
    setLocalError("");
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function continueFrom(current: number, form: HTMLFormElement) {
    const data = new FormData(form);
    const error = current === 1 ? stepOneError(data) : stepTwoError(data, showWait);
    if (error) {
      setLocalError(error);
      return;
    }
    move(current + 1);
  }

  const alert = localError || state.error;

  return (
    <form
      action={action}
      className="grid gap-8"
      noValidate
      onSubmit={(event) => {
        const error = stepThreeError(new FormData(event.currentTarget));
        if (error) {
          event.preventDefault();
          setLocalError(error);
        }
      }}
    >
      <p className="text-sm text-muted-foreground">Step {step} of 3</p>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
        {step === 1 ? "Your concern" : step === 2 ? "The comparison" : "How to reach you"}
      </h2>
      {alert ? (
        <p role="alert" className="rounded-2xl border border-destructive px-4 py-3 text-sm">
          {alert}
        </p>
      ) : null}

      <div className={step === 1 ? "grid gap-6" : "hidden"}>
        <fieldset className="grid gap-4">
          <legend className="text-xl">Your main concern</legend>
          {CONCERN_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-3">
              <input
                type="radio"
                name="concern"
                value={option.value}
                checked={concern === option.value}
                onChange={() => setConcern(option.value)}
                className="size-4 accent-primary"
              />
              {option.label}
            </label>
          ))}
        </fieldset>
        <Field label="Procedure being considered" htmlFor="procedure">
          <select id="procedure" name="procedure" required className={control} defaultValue="">
            <option value="" disabled>
              Select a procedure
            </option>
            {PROCEDURE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Has a clinician recommended or discussed this procedure?" htmlFor="discussed">
          <select id="discussed" name="discussed" required className={control} defaultValue="not_sure">
            {DISCUSSED_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={step === 2 ? "grid gap-6" : "hidden"}>
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
        {showWait ? (
          <>
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
          </>
        ) : (
          <input type="hidden" name="waitKind" value="unknown" />
        )}
        {showQuote ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="UK private quote, in pounds" htmlFor="quoteAmount" hint="Optional. Leave blank if you do not have one.">
              <Input id="quoteAmount" name="quoteAmount" inputMode="decimal" className={control} />
            </Field>
            <Field label="Date of that quote" htmlFor="quoteDate">
              <Input id="quoteDate" name="quoteDate" type="date" className={control} />
            </Field>
          </div>
        ) : null}
        <Field label="Preferred timeframe" htmlFor="timeframe">
          <select id="timeframe" name="timeframe" required className={control} defaultValue="Not sure">
            {TIMEFRAME_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={step === 3 ? "grid gap-6" : "hidden"}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Your name" htmlFor="name">
            <Input id="name" name="name" required autoComplete="name" maxLength={120} className={control} />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" required autoComplete="email" className={control} />
          </Field>
          <Field label="Phone" htmlFor="phone" hint="Required only if you ask us to phone.">
            <Input id="phone" name="phone" type="tel" autoComplete="tel" required={preference === "phone"} className={control} />
          </Field>
          <Field label="How should we contact you?" htmlFor="preference">
            <select
              id="preference"
              name="preference"
              required
              className={control}
              value={preference}
              onChange={(event) => setPreference(event.target.value)}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </Field>
        </div>
        <fieldset className="grid gap-3 rounded-2xl border border-border bg-card p-4">
          <legend className="px-1 text-base font-medium">How this enquiry is used</legend>
          <p className="text-sm leading-6">{CONSENT_STATEMENT}</p>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="consent" required className="mt-1 size-4 accent-primary" />
            I understand and agree to this enquiry being stored for coordinator review.
          </label>
        </fieldset>
      </div>

      <div className="flex flex-wrap gap-3">
        {step > 1 ? (
          <Button type="button" variant="secondary" className="h-12 px-5 text-base" onClick={() => move(step - 1)}>
            Back
          </Button>
        ) : null}
        {step < 3 ? (
          <Button
            type="button"
            className="h-12 px-5 text-base"
            onClick={(event) => continueFrom(step, event.currentTarget.form!)}
          >
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={pending} className="h-12 px-5 text-base">
            {pending ? "Sending the enquiry" : "Send my enquiry"}
          </Button>
        )}
      </div>
    </form>
  );
}

function stepOneError(data: FormData) {
  if (!data.get("concern")) return "Choose the main concern.";
  if (!String(data.get("procedure") ?? "")) return "Choose the procedure being considered.";
  if (!data.get("discussed")) return "Say whether a clinician has discussed it.";
  return "";
}

function stepTwoError(data: FormData, showWait: boolean) {
  if (String(data.get("location") ?? "").trim().length < 2) return "Enter a city or county.";
  if (showWait) {
    const waitKind = String(data.get("waitKind") ?? "");
    if (!waitKind) return "Say what you know about the wait.";
    if (waitKind !== "unknown" && !String(data.get("waitDetail") ?? "").trim()) {
      return "Describe the wait, or choose “I don't know”.";
    }
  }
  return "";
}

function stepThreeError(data: FormData) {
  if (String(data.get("name") ?? "").trim().length < 2) return "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") ?? ""))) {
    return "Enter an email address.";
  }
  if (data.get("preference") === "phone" && String(data.get("phone") ?? "").trim().length < 6) {
    return "Enter a phone number, or choose email instead.";
  }
  if (data.get("consent") !== "on") return "Confirm that the enquiry can be stored.";
  return "";
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
