// /routine/bedime/page/tsx

"use client";

import { useMemo, useState } from "react";
import ScreenTitle from "@/components/screen-title";
import BigButton from "@/components/big-button";

type Step = { id: string; text: string };

const DEFAULT_STEPS: Step[] = [
  { id: "1", text: "Pajamas on" },
  { id: "2", text: "Brush teeth" },
  { id: "3", text: "Pick tomorrow’s clothes (optional)" },
  { id: "4", text: "Story / quiet time" },
  { id: "5", text: "Lights low + cuddles" },
];

export default function BedtimeRoutinePage() {
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
        title="Bedtime Routine"
        subtitle="Slow is okay. Calm is the goal."
      />

      <div className="rounded-2xl border border-soft bg-card p-3">
        <ul className="space-y-2">
          {steps.map((s) => {
            const checked = doneIds.has(s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggleStep(s.id)}
                  className={[
                    "w-full rounded-xl border border-soft px-4 py-4 text-left transition-transform duration-150 active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                    "min-h-[56px]",
                    checked ? "bg-primary-soft" : "bg-card hover:bg-primary-soft",
                  ].join(" ")}
                  aria-pressed={checked}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-medium">{s.text}</span>
                    <span className={checked ? "text-primary text-lg" : "text-muted text-lg"} aria-hidden>
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
        <div className="rounded-2xl border border-soft bg-card p-4">
          <p className="text-lg font-semibold">All done. 🌙</p>
          <p className="mt-1 text-muted">You worked hard today. Rest time.</p>
        </div>
      )}
    </div>
  );
}
