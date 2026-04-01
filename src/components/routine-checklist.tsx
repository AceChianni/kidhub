// src/components/routine-checklist.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BigButton from "@/components/big-button";

export type RoutineStep = {
  id: string;
  text: string;
  emoji?: string;
};

export default function RoutineChecklist({
  steps,
  onFinish,
  finishHref = "/rewards",
  doneTitle = "All done",
  doneMessage = "Nice work finishing your routine.",
}: {
  steps: RoutineStep[];
  onFinish?: () => void;
  finishHref?: string;
  doneTitle?: string;
  doneMessage?: string;
}) {
  const router = useRouter();

  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());

  const stableSteps = useMemo(() => steps, [steps]);

  const toggleStep = (id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const resetAll = () => setDoneIds(new Set());

  const allDone = doneIds.size === stableSteps.length;
  const remaining = stableSteps.length - doneIds.size;

  const finish = () => {
    if (!allDone) return;
    onFinish?.();
    router.push(finishHref);
  };

  return (
    <div className="space-y-4">
      <div className="sr-only" aria-live="polite">
        {allDone ? "All steps completed" : `${remaining} steps remaining`}
      </div>

      <div className="w-full rounded-2xl bg-card">
        <ul className="m-0 list-none space-y-3 p-0">
          {stableSteps.map((s, idx) => {
            const checked = doneIds.has(s.id);

            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggleStep(s.id)}
                  aria-pressed={checked}
                  aria-label={`${s.text}. ${checked ? "Completed" : "Not completed"}`}
                  className={[
                    "tile tile-interactive card-shadow w-full px-4 py-4 text-left",
                    "focus-ring",
                    checked ? "bg-primary-soft" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card shadow-sm">
                      <span className="text-xl" aria-hidden>
                        {s.emoji ?? "✅"}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-muted-foreground">
                          Step {idx + 1}
                        </span>

                        <span
                          className={[
                            "text-xs font-medium",
                            checked ? "text-success" : "text-muted-foreground",
                          ].join(" ")}
                        >
                          {checked ? "Completed" : "Not completed"}
                        </span>
                      </div>

                      <div className="mt-1 break-words text-[15px] font-semibold leading-snug text-app">
                        {s.text}
                      </div>
                    </div>

                    <div
                      className={[
                        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        checked
                          ? "bg-success-soft text-success"
                          : "bg-card text-muted-foreground",
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

        {allDone && (
          <div className="mt-3 rounded-2xl bg-success-soft px-4 py-4 text-center">
            <h2 className="text-base font-semibold text-app">{doneTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{doneMessage}</p>
          </div>
        )}

        <div className="mt-3 space-y-2 border-t border-soft bg-card px-1 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <BigButton variant="secondary" onClick={resetAll}>
              Reset
            </BigButton>

            <BigButton
              variant="primary"
              onClick={finish}
              disabled={!allDone}
              aria-disabled={!allDone}
            >
              Finish
            </BigButton>
          </div>

          {!allDone && (
            <p className="text-center text-xs text-muted-foreground opacity-80">
              {remaining} step{remaining !== 1 ? "s" : ""} left
            </p>
          )}
        </div>
      </div>
    </div>
  );
}