"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Field = { id: string; label: string; hint?: string };
type Step = { title: string; fields: Field[] };

export function SyntheticRegistration({
  steps,
  resultTitle,
  resultBody,
}: {
  steps: Step[];
  resultTitle: string;
  resultBody: string;
}) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const done = step >= steps.length;
  const current = steps[step];

  function next(form: HTMLFormElement) {
    const data = new FormData(form);
    const missing = current.fields.some((field) => !String(data.get(field.id) ?? "").trim());
    if (missing) {
      setError("Complete every field. Use sample details. Nothing is saved.");
      return;
    }
    setError("");
    setStep(step + 1);
  }

  if (done) {
    return (
      <section className="grid gap-3 rounded-2xl border border-border bg-wash p-5">
        <h2 className="text-2xl">{resultTitle}</h2>
        <p className="leading-7">{resultBody}</p>
      </section>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        next(event.currentTarget);
      }}
    >
      <p className="text-sm text-muted-foreground">
        Step {step + 1} of {steps.length}. Demonstration only. Nothing you type is stored.
      </p>
      <h2 className="text-2xl">{current.title}</h2>
      {error ? (
        <p role="alert" className="rounded-2xl border border-destructive px-4 py-3 text-sm">
          {error}
        </p>
      ) : null}
      {current.fields.map((field) => (
        <div key={field.id} className="grid gap-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input id={field.id} name={field.id} className="h-12 rounded-2xl" autoComplete="off" />
          {field.hint ? <p className="text-sm text-muted-foreground">{field.hint}</p> : null}
        </div>
      ))}
      <div className="flex gap-3">
        {step > 0 ? (
          <Button type="button" variant="secondary" className="h-12 px-5" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        ) : null}
        <Button type="submit" className="h-12 px-5">
          {step === steps.length - 1 ? "Finish demonstration" : "Continue"}
        </Button>
      </div>
    </form>
  );
}
