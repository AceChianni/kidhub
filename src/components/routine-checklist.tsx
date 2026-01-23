// /components/routine-checklist.tsx
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
}: {
  steps: RoutineStep[];
  onFinish?: () => void;
  finishHref?: string;
}) {
  const router = useRouter();

  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());

  const stableSteps = useMemo(() => steps, [steps]);

  const toggleStep = (id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetAll = () => setDoneIds(new Set());

  const allDone = doneIds.size === stableSteps.length;

  const finish = () => {
    if (!allDone) return;
    onFinish?.();
    router.push(finishHref);
  };

  return (
    <div className="space-y-4">
      {/* Checklist card */}
      <div className="w-full rounded-2xl border border-soft bg-card overflow-hidden">
        {/* Scroll area (vertical only, no horizontal scroll) */}
        <div className="max-h-[44vh] overflow-y-auto overflow-x-hidden px-4 py-4">
          <div className="flex justify-center">
            <ul className="w-full max-w-[420px] list-none p-0 m-0 space-y-3 overflow-x-hidden">
              {stableSteps.map((s, idx) => {
                const checked = doneIds.has(s.id);

                return (
                  <li key={s.id} className="overflow-x-hidden">
                    <button
                      type="button"
                      onClick={() => toggleStep(s.id)}
                      className={[
                        "w-full min-w-0 overflow-hidden rounded-2xl px-4 py-4",
                        "bg-card text-app shadow-sm",
                        "transition-transform duration-150 active:scale-[0.99]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                        checked ? "bg-primary-soft" : "hover:bg-primary-soft",
                      ].join(" ")}
                      aria-pressed={checked}
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        {/* Emoji bubble */}
                        <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-sm">
                          <span className="text-xl" aria-hidden>
                            {s.emoji ?? "✅"}
                          </span>
                        </div>

                        {/* Text block */}
                        <div className="min-w-0 flex-1">
                          <div className="grid grid-cols-[1fr_auto] items-center gap-3 min-w-0">
                            <span className="min-w-0 text-xs text-muted-foreground truncate">
                              Step {idx + 1}
                            </span>

                            <span
                              className={[
                                "shrink-0 inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium",
                                "bg-card",
                                checked ? "text-app" : "text-muted-foreground",
                              ].join(" ")}
                            >
                              {checked ? "Done" : "To do"}
                            </span>
                          </div>

                          <div className="mt-1 text-base font-semibold leading-snug break-words">
                            {s.text}
                          </div>
                        </div>

                        {/* Check indicator */}
                        <div
                          className={[
                            "shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm",
                            checked ? "bg-primary-soft text-app" : "bg-card text-muted-foreground",
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
          </div>
        </div>

        {/* Bottom action bar (same size buttons) */}
        <div className="border-t border-soft bg-card/95 backdrop-blur px-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <BigButton variant="secondary" onClick={resetAll}>
              Reset
            </BigButton>

            <BigButton variant="primary" onClick={finish} disabled={!allDone}>
              Finish
            </BigButton>
          </div>
        </div>
      </div>
    </div>
  );
}
