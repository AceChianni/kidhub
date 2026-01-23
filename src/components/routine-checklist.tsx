// /components/routine-checklist.tsx
"use client";

import { useMemo, useState } from "react";
import BigButton from "@/components/big-button";
import LinkButton from "@/components/link-button";

export type RoutineStep = {
  id: string;
  text: string;
  emoji?: string;
};

export default function RoutineChecklist({
  steps,
  doneTitle = "All done. 🎉",
  doneMessage = "Nice work. You can rest now.",
  doneActionLabel,
  doneActionHref,
  onFinish,
}: {
  steps: RoutineStep[];
  doneTitle?: string;
  doneMessage?: string;
  doneActionLabel?: string;
  doneActionHref?: string;
  onFinish?: () => void;
}) {
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [showDone, setShowDone] = useState(false);

  const stableSteps = useMemo(() => steps, [steps]);

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

  const allDone = doneIds.size === stableSteps.length;

  const finish = () => {
    setShowDone(true);
    onFinish?.();
  };

  return (
    <div className="space-y-4">
      {/* Checklist card */}
      <div className="w-full rounded-2xl border border-soft bg-card overflow-hidden">
        {/* Scroll area */}
        <div className="max-h-[44vh] overflow-y-auto overflow-x-hidden px-3 py-4">
          {/* centers the whole list block */}
          <div className="flex justify-center">
            <ul className="w-[min(360px,100%)] list-none p-0 m-0 space-y-3 overflow-x-hidden">
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
                        <div className="min-w-0 flex-1 text-left">
                          {/* Step + Status */}
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

                          {/* Main step text */}
                          <div className="mt-1 text-base font-semibold leading-snug break-words">
                            {s.text}
                          </div>
                        </div>

                        {/* Check indicator */}
                        <div
                          className={[
                            "shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm",
                            checked
                              ? "bg-primary-soft text-app"
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
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="border-t border-soft bg-card/95 backdrop-blur px-4 py-4">
          <div className="grid grid-cols-2 gap-2 [&>*]:w-full">
            <BigButton variant="secondary" onClick={resetAll}>
              Reset
            </BigButton>

            <BigButton variant="primary" onClick={finish} disabled={!allDone}>
              Finish
            </BigButton>
          </div>
        </div>
      </div>

      {/* Done card */}
      {showDone && allDone && (
        <div className="rounded-2xl border border-soft bg-card p-4">
          <p className="text-lg font-semibold">{doneTitle}</p>
          <p className="mt-1 text-muted-foreground">{doneMessage}</p>

          {doneActionHref && doneActionLabel && (
            <div className="mt-4">
              <LinkButton
                href={doneActionHref}
                variant="primary"
                className="w-full min-h-[56px] text-base"
              >
                {doneActionLabel}
              </LinkButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
