//       <TimerPill label="Transition Timer" defaultMinutes={10} minMinutes={1} maxMinutes={30} />

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
      <div className="rounded-2xl border border-soft bg-card p-3 mb-2">
        <ul className="list-none p-0 m-0 space-y-2">
          {stableSteps.map((s, idx) => {
            const checked = doneIds.has(s.id);

            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggleStep(s.id)}
                  className={[
                    "w-full rounded-2xl border border-soft px-4 py-4",
                    "bg-card text-app no-underline",
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
                          {s.emoji ?? "✅"}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Step {idx + 1}
                        </span>
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
                        checked
                          ? "bg-primary text-white"
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

        <div className="mt-3 flex gap-2">
          <BigButton variant="secondary" onClick={resetAll}>
            Reset
          </BigButton>
          <BigButton variant="primary" onClick={finish} disabled={!allDone}>
            Finish
          </BigButton>
        </div>
      </div>

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
