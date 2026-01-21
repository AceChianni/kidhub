// /app/rewards/page.tsx

"use client";

import { useState } from "react";
import ScreenTitle from "@/components/screen-title";

const REWARDS = [
  { id: "r1", title: "Sticker / stamp", emoji: "🏷️" },
  { id: "r2", title: "5 min choice time", emoji: "🎮" },
  { id: "r3", title: "Snack / treat", emoji: "🍓" },
  { id: "r4", title: "Dance break", emoji: "🕺" },
  { id: "r5", title: "Story time", emoji: "📚" },
  { id: "r6", title: "Outside walk", emoji: "🌿" },
];

export default function RewardsPage() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <ScreenTitle title="Rewards" subtitle="Celebrate effort. Keep it gentle." />

      <div className="grid grid-cols-2 gap-3">
        {REWARDS.map((r) => {
          const active = picked === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setPicked(r.id)}
              className={[
                "min-h-[92px] rounded-2xl border p-4 text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                active ? "bg-black text-white" : "bg-white",
              ].join(" ")}
              aria-pressed={active}
            >
              <div className="text-2xl" aria-hidden>
                {r.emoji}
              </div>
              <div className="mt-2 font-medium">{r.title}</div>
              {active && <div className="mt-1 text-sm opacity-90">Picked ✓</div>}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="rounded-2xl border p-4">
          <p className="text-lg font-semibold">Nice job. ⭐</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Rewards are about encouragement—not pressure.
          </p>
        </div>
      )}
    </div>
  );
}
