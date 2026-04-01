// /components/timer-pill.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLowStim } from "@/components/low-stim-provider";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

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

  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) {
      setSecondsLeft(totalSeconds);
      completedRef.current = false;
    }
  }, [minutes, totalSeconds, running]);

  useEffect(() => {
    if (!running) return;

    const t = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    return () => window.clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (secondsLeft === 0 && running) {
      setRunning(false);
    }

    if (secondsLeft === 0 && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [secondsLeft, running, onComplete]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  const canDec = !running && minutes > minMinutes;
  const canInc = !running && minutes < maxMinutes;

  return (
    <div className="space-y-4 rounded-2xl bg-card p-4">
      {/* Screen reader updates */}
      <div className="sr-only" aria-live="polite">
        {running
          ? `Timer running: ${mm} minutes ${ss} seconds remaining`
          : `Timer set to ${minutes} minutes`}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-app">{label}</p>

          <p className="text-sm text-muted-foreground">
            {lowStim
              ? "Calm mode is on."
              : "Set a time, then start when ready."}
          </p>
        </div>

        <div className="rounded-xl bg-card-strong px-3 py-2 text-right">
          <div className="text-xl font-semibold tabular-nums text-app">
            {pad(mm)}:{pad(ss)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        {/* Minutes */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!canDec}
            onClick={() => setMinutes((m) => Math.max(minMinutes, m - 1))}
            className="control-min focus-ring disabled:opacity-50"
            aria-label="Decrease minutes"
          >
            −
          </button>

          <div className="rounded-full bg-card-strong px-3 py-1 text-sm font-medium text-app">
            {minutes} min
          </div>

          <button
            type="button"
            disabled={!canInc}
            onClick={() => setMinutes((m) => Math.min(maxMinutes, m + 1))}
            className="control-min focus-ring disabled:opacity-50"
            aria-label="Increase minutes"
          >
            +
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setRunning((p) => !p)}
            aria-pressed={running}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            type="button"
            className="btn-secondary"
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
    </div>
  );
}