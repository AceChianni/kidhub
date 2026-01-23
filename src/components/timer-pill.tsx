// /components/timer-pill.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLowStim } from "@/components/low-stim-provider";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const PRESETS_TOP = [5, 10, 15] as const;
const PRESETS_BOTTOM = [20, 30] as const;

export default function TimerPill({
  label = "Transition Timer",
  defaultMinutes = 10,
  minMinutes = 1,
  maxMinutes = 60,
  onComplete,
}: {
  label?: string;
  defaultMinutes?: number;
  minMinutes?: number;
  maxMinutes?: number;
  onComplete?: () => void;
}) {
  const { lowStim } = useLowStim();

  const [minutes, setMinutes] = useState(defaultMinutes);
  const totalSeconds = useMemo(() => minutes * 60, [minutes]);

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);

  const [showPresets, setShowPresets] = useState(false);
  const completedRef = useRef(false);

  // Only reset the clock when MINUTES change (and we're not running)
  useEffect(() => {
    if (!running) {
      setSecondsLeft(totalSeconds);
      completedRef.current = false;
    }
  }, [minutes, totalSeconds]); // important: not dependent on running

  // Tick down while running
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [running]);

  // Completion behavior
  useEffect(() => {
    if (secondsLeft === 0 && running) setRunning(false);

    if (secondsLeft === 0 && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [secondsLeft, running, onComplete]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  const canDec = !running && minutes > minMinutes;
  const canInc = !running && minutes < maxMinutes;

  const setPreset = (m: number) => {
    if (running) return;
    const clamped = Math.max(minMinutes, Math.min(maxMinutes, m));
    setMinutes(clamped);
    setShowPresets(false);
  };

  return (
    <div className="rounded-2xl border border-soft bg-card p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-app">{label}</p>
          <p className="text-sm text-muted-foreground">
            {lowStim
              ? "Low stim mode reduces intensity + switches to dark theme."
              : "Set minutes, then start."}
          </p>
        </div>

        <div className="rounded-xl bg-card px-3 py-1.5 text-right shadow-sm">
          <div className="text-xl font-semibold tabular-nums text-app">
            {pad(mm)}:{pad(ss)}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        {/* Minute controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!canDec}
            onClick={() => setMinutes((m) => Math.max(minMinutes, m - 1))}
            className={[
              "h-8 w-8 rounded-full",
              "bg-card shadow-sm",
              "disabled:opacity-50",
              "transition-transform active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
              "hover:bg-primary-soft",
            ].join(" ")}
            aria-label="Decrease minutes"
          >
            −
          </button>

          {/* Clicking this toggles the chips (and it sits IN FLOW, so no overlap) */}
          <button
            type="button"
            disabled={running}
            onClick={() => setShowPresets((s) => !s)}
            className={[
              "rounded-full px-4 py-2 text-center shadow-sm",
              "bg-primary-soft text-app",
              "transition-transform active:scale-[0.99]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
              running ? "opacity-60" : "hover:brightness-[1.02]",
            ].join(" ")}
            aria-expanded={showPresets}
          >
            <div className="text-[11px] leading-none text-muted-foreground">minutes</div>
            <div className="text-sm font-semibold">{minutes}</div>
          </button>

          <button
            type="button"
            disabled={!canInc}
            onClick={() => setMinutes((m) => Math.min(maxMinutes, m + 1))}
            className={[
              "h-8 w-8 rounded-full",
              "bg-card shadow-sm",
              "disabled:opacity-50",
              "transition-transform active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
              "hover:bg-primary-soft",
            ].join(" ")}
            aria-label="Increase minutes"
          >
            +
          </button>
        </div>

        {/* Start/Pause + Reset */}
        <div className="flex gap-2">
          <button
            type="button"
            className={[
              "min-h-[38px] rounded-full px-4 text-sm font-medium shadow-sm",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
              running ? "bg-card text-app hover:bg-primary-soft" : "bg-primary text-white hover:brightness-[1.03]",
            ].join(" ")}
            onClick={() => setRunning((p) => !p)}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            type="button"
            className="min-h-[38px] rounded-full bg-card px-4 text-sm font-medium text-app hover:bg-primary-soft shadow-sm"
            onClick={() => {
              setRunning(false);
              setSecondsLeft(totalSeconds);
              completedRef.current = false;
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Quick picks (IN FLOW) so it pushes content down instead of covering the checklist */}
      {showPresets && !running && (
        <div className="mt-3 rounded-2xl bg-card p-3 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Quick picks</p>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {PRESETS_TOP.map((m) => {
                const active = minutes === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPreset(m)}
                    className={[
                      "min-h-[38px] rounded-full px-3 text-sm font-semibold",
                      "shadow-sm",
                      active ? "bg-primary text-white" : "bg-primary-soft text-app hover:brightness-[1.02]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                    ].join(" ")}
                  >
                    {m} min
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PRESETS_BOTTOM.map((m) => {
                const active = minutes === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPreset(m)}
                    className={[
                      "min-h-[38px] rounded-full px-3 text-sm font-semibold",
                      "shadow-sm",
                      active ? "bg-primary text-white" : "bg-primary-soft text-app hover:brightness-[1.02]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                    ].join(" ")}
                  >
                    {m} min
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
