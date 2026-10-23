"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addMessage, addTask, issueAccessKey, updateCase } from "@/lib/actions/staff";
import { idleKeyState, idleState } from "@/lib/form";
import { STATUS_LABELS } from "@/lib/labels";

const control =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-base md:text-base";

export function CaseStatusForm({
  caseId,
  status,
  nextAction,
  nextActionOwner,
  responseDueOn,
  pauseReason,
  declineReason,
}: {
  caseId: string;
  status: string;
  nextAction: string;
  nextActionOwner: string;
  responseDueOn: string;
  pauseReason: string;
  declineReason: string;
}) {
  const [state, action, pending] = useActionState(updateCase, idleState);
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="caseId" value={caseId} />
      {state.error ? <p role="alert">{state.error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <select id="status" name="status" defaultValue={status} className={control}>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nextActionOwner">Who acts next</Label>
          <select id="nextActionOwner" name="nextActionOwner" defaultValue={nextActionOwner} className={control}>
            <option value="coordinator">Coordinator</option>
            <option value="patient">The person</option>
            <option value="provider">Provider</option>
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="nextAction">Next action</Label>
        <Input id="nextAction" name="nextAction" defaultValue={nextAction} required className={control} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="responseDueOn">Response due</Label>
        <Input id="responseDueOn" name="responseDueOn" type="date" defaultValue={responseDueOn} className={control} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pauseReason">Pause reason</Label>
        <Textarea id="pauseReason" name="pauseReason" defaultValue={pauseReason} className="min-h-16 bg-card" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="declineReason">Closure reason</Label>
        <Textarea id="declineReason" name="declineReason" defaultValue={declineReason} className="min-h-16 bg-card" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="assign" className="size-4 accent-primary" />
        Assign this case to me
      </label>
      <Button type="submit" disabled={pending} className="h-11 w-fit px-4">
        Save case
      </Button>
    </form>
  );
}

export function MessageForm({ caseId }: { caseId: string }) {
  const [state, action, pending] = useActionState(addMessage, idleState);
  return (
    <form action={action} className="grid gap-3">
      <input type="hidden" name="caseId" value={caseId} />
      {state.error ? <p role="alert">{state.error}</p> : null}
      <Label htmlFor="kind">Add to the record</Label>
      <select id="kind" name="kind" className={control} defaultValue="note">
        <option value="note">Internal note</option>
        <option value="answer">Reply the person can see</option>
      </select>
      <Textarea id="body" name="body" required className="min-h-24 bg-card" />
      <Button type="submit" disabled={pending} className="h-11 w-fit px-4">
        {pending ? "Saving" : "Save message"}
      </Button>
    </form>
  );
}

export function TaskForm({ caseId }: { caseId: string }) {
  const [state, action, pending] = useActionState(addTask, idleState);
  return (
    <form action={action} className="grid gap-3">
      <input type="hidden" name="caseId" value={caseId} />
      {state.error ? <p role="alert">{state.error}</p> : null}
      <Label htmlFor="title">Task</Label>
      <Input id="title" name="title" required className={control} />
      <Textarea id="detail" name="detail" className="min-h-16 bg-card" />
      <select name="party" className={control} defaultValue="coordinator">
        <option value="coordinator">Coordinator</option>
        <option value="patient">The person</option>
        <option value="provider">Provider</option>
      </select>
      <Input name="dueOn" type="date" className={control} />
      <Button type="submit" disabled={pending} className="h-11 w-fit px-4">
        Add task
      </Button>
    </form>
  );
}

export function ReissueForm({ caseId }: { caseId: string }) {
  const [state, action, pending] = useActionState(issueAccessKey, idleKeyState);
  return (
    <form action={action} className="grid gap-3">
      <input type="hidden" name="caseId" value={caseId} />
      <Button type="submit" variant="secondary" disabled={pending} className="h-11 w-fit px-4">
        Issue a new access key
      </Button>
      {state.issuedKey ? (
        <p role="status" className="rounded-lg bg-secondary px-4 py-3 text-sm">
          New access key, shown once: <span className="font-medium">{state.issuedKey}</span>. The previous key no longer works.
        </p>
      ) : null}
      {state.error ? <p role="alert">{state.error}</p> : null}
    </form>
  );
}
