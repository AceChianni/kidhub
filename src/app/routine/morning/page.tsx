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
    <div className="mx-auto w-full max-w-[380px] space-y-5 pb-2">
      <ScreenTitle
        title="Morning Routine"
        subtitle="One step at a time. You can restart anytime."
      />

      <div className="space-y-3">
        <TimerPill label="Transition Timer" defaultMinutes={10} minMinutes={1} maxMinutes={30} />
      </div>

      <RoutineChecklist
        steps={STEPS}
        doneTitle="You did it! 🎉"
        doneMessage="Pick a gentle reward. Keep the win."
        doneActionLabel="Go to Rewards ⭐"
        doneActionHref="/rewards"
      />
    </div>
  );
}
