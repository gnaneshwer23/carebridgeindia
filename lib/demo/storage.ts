import { DEFAULT_DEMO, type DemoPersisted } from "@/lib/demo/fixtures";

export const DEMO_STORAGE_KEY = "carebridge-demo-v1";

export function readDemo(): DemoPersisted {
  if (typeof sessionStorage === "undefined") return DEFAULT_DEMO;
  try {
    const raw = sessionStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return DEFAULT_DEMO;
    const parsed = JSON.parse(raw) as Partial<DemoPersisted>;
    return {
      ...DEFAULT_DEMO,
      ...parsed,
      clinician: { ...DEFAULT_DEMO.clinician, ...parsed.clinician },
      notes: { ...DEFAULT_DEMO.notes, ...parsed.notes },
      followUpAnswers: { ...DEFAULT_DEMO.followUpAnswers, ...parsed.followUpAnswers },
    };
  } catch {
    return DEFAULT_DEMO;
  }
}

export function writeDemo(state: DemoPersisted) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
}
