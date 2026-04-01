// /components/low-stim-provider

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type LowStimContextValue = {
  lowStim: boolean;
  setLowStim: (v: boolean) => void;
  toggle: () => void;
};

const LowStimContext = createContext<LowStimContextValue | undefined>(undefined);

const STORAGE_KEY = "pkh_lowstim";

export function LowStimProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lowStim, setLowStim] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    let nextValue = false;

    if (saved === "true" || saved === "false") {
      nextValue = saved === "true";
    } else {
      nextValue = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    setLowStim(nextValue);
    document.documentElement.dataset.lowstim = nextValue ? "true" : "false";
  } catch {
    document.documentElement.dataset.lowstim = "false";
  } finally {
    setReady(true);
  }
}, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, String(lowStim));
    } catch {
      // ignore storage failures
    }

    document.documentElement.dataset.lowstim = lowStim ? "true" : "false";
  }, [lowStim, ready]);

  const value = useMemo(
    () => ({
      lowStim,
      setLowStim,
      toggle: () => setLowStim((prev) => !prev),
    }),
    [lowStim]
  );

  return (
    <LowStimContext.Provider value={value}>
      {children}
    </LowStimContext.Provider>
  );
}

export function useLowStim() {
  const ctx = useContext(LowStimContext);

  if (!ctx) {
    throw new Error("useLowStim must be used within LowStimProvider");
  }

  return ctx;
}