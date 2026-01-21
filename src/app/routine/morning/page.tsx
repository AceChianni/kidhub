// /app/routine/morning/page/ysx
"use client";

import { useMemo, useState } from "react";
import ScreenTitle from "@/components/screen-title";
import BigButton from "@/components/big-button";
import TimerPill from "@/components/timer-pill";

type Step = { id: string; text: string };

const DEFAULT_STEPS: Step[] = [
  { id: "1", text: "Bathroom" },
  { id: "2", text: "Brush teeth & Wash face" },
  { id: "3", text: "Get dressed" },
  { id: "4", text: "Breakfast" },
  { id: "5", text: "Shoes + backpack" },
];

export default function MorningRoutinePage() {
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [showDone, setShowDone] = useState(false);

  const steps = useMemo(() => DEFAULT_STEPS, []);

  const toggleStep = (id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetAll = () => {
    setDoneIds(new Set());
    setShowDone(false);
  };

  const allDone = doneIds.size === steps.length;

  return (
    <div className="space-y-5">
      <ScreenTitle
        title="Morning Routine"
        subtitle="One step at a time. You can restart anytime."
      />

      <TimerPill minutes={10} />

      <div className="rounded-2xl border p-3">
        <ul className="space-y-2">
          {steps.map((s) => {
            const checked = doneIds.has(s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggleStep(s.id)}
                  className={[
                    "w-full rounded-xl border px-4 py-4 text-left",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                    "min-h-[56px]",
                    checked ? "bg-black text-white" : "bg-white",
                  ].join(" ")}
                  aria-pressed={checked}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-medium">{s.text}</span>
                    <span className="text-lg" aria-hidden>
                      {checked ? "✓" : "○"}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 flex gap-2">
          <BigButton variant="secondary" onClick={resetAll}>
            Reset
          </BigButton>
          <BigButton
            variant="primary"
            onClick={() => setShowDone(true)}
            disabled={!allDone}
          >
            Finish
          </BigButton>
        </div>
      </div>

      {showDone && allDone && (
        <div className="rounded-2xl border p-4">
          <p className="text-lg font-semibold">You did it! 🎉</p>
          <p className="mt-1 text-muted-foreground">
            Pick a gentle reward. Keep the win.
          </p>
          <div className="mt-3">
            <a
              href="/rewards"
              className="inline-flex min-h-[56px] w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-white"
            >
              Go to Rewards
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
