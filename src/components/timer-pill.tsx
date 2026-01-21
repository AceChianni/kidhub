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

  // ✅ Only reset the clock when MINUTES change (and we're not running)
  useEffect(() => {
    if (!running) {
      setSecondsLeft(totalSeconds);
      completedRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes]); // <- key change: depend on minutes, not running/totalSeconds

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

        <div className="text-right">
          <div className="text-xl font-semibold tabular-nums text-app">
            {pad(mm)}:{pad(ss)}
          </div>
        </div>
      </div>

      {/* Minute controls */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!canDec}
            onClick={() => setMinutes((m) => Math.max(minMinutes, m - 1))}
            className="min-h-[44px] min-w-[44px] rounded-full border border-soft bg-card hover:bg-primary-soft disabled:opacity-50"
            aria-label="Decrease minutes"
          >
            −
          </button>

          <div className="rounded-full border border-soft bg-primary-soft px-4 py-2 text-center">
            <div className="text-[11px] leading-none text-muted-foreground">
              minutes
            </div>
            <div className="text-sm font-semibold text-app">{minutes}</div>
          </div>

          <button
            type="button"
            disabled={!canInc}
            onClick={() => setMinutes((m) => Math.min(maxMinutes, m + 1))}
            className="min-h-[44px] min-w-[44px] rounded-full border border-soft bg-card hover:bg-primary-soft disabled:opacity-50"
            aria-label="Increase minutes"
          >
            +
          </button>
        </div>

        {/* Start/Pause + Reset */}
        <div className="flex gap-2">
          <button
            className={[
              "min-h-[44px] rounded-full px-4 text-sm font-medium border transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
              running
                ? "bg-card border-soft text-app hover:bg-primary-soft"
                : "bg-primary border-transparent text-white hover:brightness-[1.03]",
            ].join(" ")}
            onClick={() => setRunning((p) => !p)}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            className="min-h-[44px] rounded-full border border-soft bg-card px-4 text-sm font-medium text-app hover:bg-primary-soft"
            onClick={() => {
              setRunning(false);
              setSecondsLeft(totalSeconds); // ✅ reset clock
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
