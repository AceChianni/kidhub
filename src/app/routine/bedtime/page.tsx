// /routine/bedime/page.tsx
"use client";

import { useMemo, useState } from "react";
import ScreenTitle from "@/components/screen-title";
import BigButton from "@/components/big-button";
import TimerPill from "@/components/timer-pill";

type Step = { id: string; text: string; emoji: string };

const DEFAULT_STEPS: Step[] = [
  { id: "1", text: "Pajamas on", emoji: "🛌" },
  { id: "2", text: "Brush teeth", emoji: "🪥" },
  { id: "3", text: "Pick tomorrow’s clothes (optional)", emoji: "👕" },
  { id: "4", text: "Story / quiet time", emoji: "📖" },
  { id: "5", text: "Lights low + cuddles", emoji: "🌙" },
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
      <ScreenTitle title="Bedtime Routine" subtitle="Slow is okay. Calm is the goal." />

      <TimerPill label="Bedtime Timer" defaultMinutes={10} minMinutes={1} maxMinutes={30} />

      <div className="rounded-2xl border border-soft bg-card p-3 mb-2">
        <ul className="list-none p-0 m-0 space-y-2">
          {steps.map((s, idx) => {
            const checked = doneIds.has(s.id);

            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggleStep(s.id)}
                  className={[
                    "w-full rounded-2xl border border-soft px-4 py-4",
                    "bg-card text-app",
                    "transition-transform duration-150 active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                    checked ? "bg-primary-soft" : "hover:bg-primary-soft",
                  ].join(" ")}
                  aria-pressed={checked}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-card">
                        <span className="text-xl" aria-hidden>
                          {s.emoji}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Step {idx + 1}</span>
                        <span
                          className={[
                            "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs border border-soft",
                            checked ? "bg-card" : "bg-card/70",
                          ].join(" ")}
                        >
                          {checked ? "Done" : "To do"}
                        </span>
                      </div>
                    </div>

                    <div className="text-base font-semibold">{s.text}</div>

                    <div
                      className={[
                        "mt-0.5 inline-flex items-center justify-center rounded-full border border-soft",
                        "h-9 w-9",
                        checked ? "bg-primary text-white" : "bg-card text-muted-foreground",
                      ].join(" ")}
                      aria-hidden
                    >
                      {checked ? "✓" : "○"}
                    </div>
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
          <BigButton variant="primary" onClick={() => setShowDone(true)} disabled={!allDone}>
            Finish
          </BigButton>
        </div>
      </div>

      {showDone && allDone && (
        <div className="rounded-2xl border border-soft bg-card p-4">
          <p className="text-lg font-semibold">All done. 🌙</p>
          <p className="mt-1 text-muted-foreground">You worked hard today. Rest time.</p>
        </div>
      )}
    </div>
  );
}
