// /src/app/routine/morning/page.tsx
"use client";

import ScreenTitle from "@/components/screen-title";
import TimerPill from "@/components/timer-pill";
import RoutineChecklist, { RoutineStep } from "@/components/routine-checklist";

const STEPS: RoutineStep[] = [
  { id: "1", text: "Bathroom", emoji: "🚽" },
  { id: "2", text: "Brush teeth + wash face", emoji: "🦷" },
  { id: "3", text: "Get dressed", emoji: "👕" },
  { id: "4", text: "Breakfast", emoji: "🍳" },
  { id: "5", text: "Shoes + backpack", emoji: "🎒" },
];

export default function MorningRoutinePage() {
  return (
    <div className="mx-auto w-full max-w-[380px] space-y-6 pb-6">
      <ScreenTitle
        title="Morning Routine"
        subtitle="One step at a time. You can restart anytime."
      />

      <section aria-labelledby="transition-timer" className="space-y-3">
        <h2 id="transition-timer" className="sr-only">
          Transition timer
        </h2>

        <TimerPill
          label="Transition Timer"
          defaultMinutes={10}
          minMinutes={1}
          maxMinutes={30}
        />
      </section>

      <section aria-labelledby="morning-steps" className="space-y-3">
        <h2 id="morning-steps" className="sr-only">
          Morning routine steps
        </h2>

        <RoutineChecklist
          steps={STEPS}
          finishHref="/rewards"
          doneTitle="Morning routine complete"
          doneMessage="Nice work. You’re ready for the next part of the day."
        />
      </section>
    </div>
  );
}