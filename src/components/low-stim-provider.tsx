// /components/low-stim-provider

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type LowStimContextValue = {
  lowStim: boolean;
  setLowStim: (v: boolean) => void;
  toggle: () => void;
};

const LowStimContext = createContext<LowStimContextValue | undefined>(undefined);

export function LowStimProvider({ children }: { children: React.ReactNode }) {
  const [lowStim, setLowStim] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("pkh_lowstim");
      if (saved === "true") setLowStim(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("pkh_lowstim", String(lowStim));
    } catch {
      // ignore
    }
    document.documentElement.dataset.lowstim = lowStim ? "true" : "false";
  }, [lowStim]);

  const value = useMemo(
    () => ({
      lowStim,
      setLowStim,
      toggle: () => setLowStim((p) => !p),
    }),
    [lowStim]
  );

  return <LowStimContext.Provider value={value}>{children}</LowStimContext.Provider>;
}

export function useLowStim() {
  const ctx = useContext(LowStimContext);
  if (!ctx) throw new Error("useLowStim must be used within LowStimProvider");
  return ctx;
}
