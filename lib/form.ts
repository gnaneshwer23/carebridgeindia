export type ActionState = { error: string };

export const idleState: ActionState = { error: "" };

export type KeyState = { error: string; issuedKey: string };

export const idleKeyState: KeyState = { error: "", issuedKey: "" };

export function field(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function oneOf<T extends string>(value: string, allowed: readonly T[]) {
  return (allowed as readonly string[]).includes(value) ? (value as T) : null;
}
