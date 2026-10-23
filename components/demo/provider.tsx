"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_DEMO, type DemoPersisted } from "@/lib/demo/fixtures";
import { readDemo, writeDemo } from "@/lib/demo/storage";

type DemoContextValue = {
  state: DemoPersisted;
  update: (patch: Partial<DemoPersisted> | ((current: DemoPersisted) => DemoPersisted)) => void;
  reset: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoPersisted>(DEFAULT_DEMO);

  useEffect(() => {
    setState(readDemo());
  }, []);

  function update(patch: Partial<DemoPersisted> | ((current: DemoPersisted) => DemoPersisted)) {
    setState((current) => {
      const next = typeof patch === "function" ? patch(current) : { ...current, ...patch };
      writeDemo(next);
      return next;
    });
  }

  function reset() {
    writeDemo(DEFAULT_DEMO);
    setState(DEFAULT_DEMO);
  }

  return (
    <DemoContext.Provider value={{ state, update, reset }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return value;
}
