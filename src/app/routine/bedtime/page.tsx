// /routine/bedtime/page.tsx
"use client";

import ScreenTitle from "@/components/screen-title";
import TimerPill from "@/components/timer-pill";
import RoutineChecklist, { RoutineStep } from "@/components/routine-checklist";

const STEPS: RoutineStep[] = [
  { id: "1", text: "Pajamas on", emoji: "🛌" },
  { id: "2", text: "Brush teeth", emoji: "🪥" },
  { id: "3", text: "Pick tomorrow’s clothes (optional)", emoji: "👕" },
  { id: "4", text: "Story / quiet time", emoji: "📖" },
  { id: "5", text: "Lights low + cuddles", emoji: "🌙" },
];

export default function BedtimeRoutinePage() {
  return (
    <div className="space-y-5">
      <ScreenTitle title="Bedtime Routine" subtitle="Slow is okay. Calm is the goal." />

      <TimerPill label="Bedtime Timer" defaultMinutes={5} minMinutes={1} maxMinutes={30} />

      <RoutineChecklist
        steps={STEPS}
        doneTitle="All done. 🌙"
        doneMessage="You worked hard today. Rest time."
      />
    </div>
  );
}
