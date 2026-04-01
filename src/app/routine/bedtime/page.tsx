// /routine/bedtime/page.tsx
"use client";

import ScreenTitle from "@/components/screen-title";
import TimerPill from "@/components/timer-pill";
import RoutineChecklist, { RoutineStep } from "@/components/routine-checklist";

const STEPS: RoutineStep[] = [
  { id: "1", text: "Pajamas on", emoji: "🛌" },
  { id: "2", text: "Brush teeth", emoji: "🪥" },
  { id: "3", text: "Pick tomorrow’s clothes (optional)", emoji: "👕" },
  { id: "4", text: "Story or quiet time", emoji: "📖" },
  { id: "5", text: "Lights low and cuddles", emoji: "🌙" },
];

export default function BedtimeRoutinePage() {
  return (
    <div className="mx-auto w-full max-w-[380px] space-y-6 pb-6">
      <ScreenTitle
        title="Bedtime Routine"
        subtitle="Slow is okay. Calm is the goal."
      />

      <section aria-labelledby="bedtime-timer" className="space-y-3">
        <h2 id="bedtime-timer" className="sr-only">
          Bedtime timer
        </h2>

        <TimerPill
          label="Bedtime Timer"
          defaultMinutes={5}
          minMinutes={1}
          maxMinutes={30}
        />
      </section>

      <section aria-labelledby="bedtime-steps" className="space-y-3">
        <h2 id="bedtime-steps" className="sr-only">
          Bedtime routine steps
        </h2>

        <RoutineChecklist
          steps={STEPS}
          doneTitle="All done. 🌙"
          doneMessage="You worked hard today. Rest time."
          finishHref="/"
        />
      </section>
    </div>
  );
}