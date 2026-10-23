"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { login } from "@/lib/actions/staff";
import {
  askQuestion,
  declineCase,
  openWithKey,
  pauseCase,
} from "@/lib/actions/patient";
import { idleState } from "@/lib/form";

const control =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-base md:text-base";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, idleState);
  return (
    <form action={action} className="grid max-w-md gap-4">
      {state.error ? <p role="alert">{state.error}</p> : null}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="username" required className={control} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required className={control} />
      </div>
      <Button type="submit" disabled={pending} className="h-11 w-fit px-4">
        {pending ? "Checking details" : "Sign in"}
      </Button>
    </form>
  );
}

export function AccessForm() {
  const [state, action, pending] = useActionState(openWithKey, idleState);
  return (
    <form action={action} className="grid max-w-md gap-4">
      {state.error ? <p role="alert">{state.error}</p> : null}
      <div className="grid gap-2">
        <Label htmlFor="reference">Reference</Label>
        <Input id="reference" name="reference" required autoComplete="off" className={control} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="key">Access key</Label>
        <Input id="key" name="key" required autoComplete="off" className={control} />
      </div>
      <Button type="submit" disabled={pending} className="h-11 w-fit px-4">
        {pending ? "Opening the case" : "Open my case"}
      </Button>
    </form>
  );
}

export function QuestionForm() {
  const [state, action, pending] = useActionState(askQuestion, idleState);
  return (
    <form action={action} className="grid gap-3">
      {state.error ? <p role="alert">{state.error}</p> : null}
      <Label htmlFor="question">Ask a question</Label>
      <Textarea id="question" name="question" required className="min-h-24 bg-card text-base" />
      <Button type="submit" disabled={pending} className="h-11 w-fit px-4">
        Send question
      </Button>
    </form>
  );
}

export function PauseForm() {
  const [state, action, pending] = useActionState(pauseCase, idleState);
  return (
    <form action={action} className="grid gap-3">
      {state.error ? <p role="alert">{state.error}</p> : null}
      <Label htmlFor="pause-reason">Pause this enquiry</Label>
      <Textarea id="pause-reason" name="reason" placeholder="Optional reason" className="min-h-20 bg-card text-base" />
      <Button type="submit" variant="secondary" disabled={pending} className="h-11 w-fit px-4">
        Pause
      </Button>
    </form>
  );
}

export function DeclineForm() {
  const [state, action, pending] = useActionState(declineCase, idleState);
  return (
    <form action={action} className="grid gap-3">
      {state.error ? <p role="alert">{state.error}</p> : null}
      <Label htmlFor="decline-reason">Decide not to continue</Label>
      <Textarea id="decline-reason" name="reason" placeholder="Optional reason" className="min-h-20 bg-card text-base" />
      <Button type="submit" variant="secondary" disabled={pending} className="h-11 w-fit px-4">
        Close this enquiry
      </Button>
    </form>
  );
}
