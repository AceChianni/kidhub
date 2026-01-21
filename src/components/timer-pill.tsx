"use client";

import { useEffect, useMemo, useState } from "react";
import { useLowStim } from "@/components/low-stim-provider";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function TimerPill({ minutes }: { minutes: number }) {
  const totalSeconds = useMemo(() => minutes * 60, [minutes]);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const { lowStim } = useLowStim();

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (secondsLeft === 0) setRunning(false);
  }, [secondsLeft]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  return (
    <div className="rounded-2xl border p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Transition Timer</p>
          <p className="text-sm text-muted-foreground">
            {lowStim ? "Low stim mode reduces intensity." : "Use this to support transitions."}
          </p>
        </div>

        <div className="text-right">
          <div className="text-xl font-semibold tabular-nums">
            {pad(mm)}:{pad(ss)}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="min-h-[44px] flex-1 rounded-xl bg-black px-4 py-2 text-white"
          onClick={() => setRunning((p) => !p)}
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          className="min-h-[44px] flex-1 rounded-xl border px-4 py-2"
          onClick={() => {
            setRunning(false);
            setSecondsLeft(totalSeconds);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
