// /app/rewards/page.tsx
"use client";

import { useMemo, useState } from "react";
import ScreenTitle from "@/components/screen-title";
import BigButton from "@/components/big-button";
import { useRouter } from "next/navigation";

const REWARDS = [
  { id: "r1", title: "Sticker / stamp", emoji: "🏷️" },
  { id: "r2", title: "5 min choice time", emoji: "🎮" },
  { id: "r3", title: "Snack / treat", emoji: "🍓" },
  { id: "r4", title: "Dance break", emoji: "🕺" },
  { id: "r5", title: "Story time", emoji: "📚" },
  { id: "r6", title: "Outside walk", emoji: "🌿" },
];

export default function RewardsPage() {
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);

  const pickedReward = useMemo(
    () => REWARDS.find((r) => r.id === picked) ?? null,
    [picked]
  );

  return (
    <div className="mx-auto w-full max-w-[380px] space-y-5 pb-2">
      <ScreenTitle title="Rewards" subtitle="Celebrate effort. Keep it gentle." />

      {/* Reward grid */}
      <div className="grid grid-cols-2 gap-3">
        {REWARDS.map((r) => {
          const active = picked === r.id;

          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setPicked(r.id)}
              className={[
                "min-h-[92px] rounded-2xl border border-soft p-4 text-left",
                "bg-card text-app shadow-sm",
                "transition-transform duration-150 active:scale-[0.99]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                active ? "bg-primary-soft" : "hover:bg-primary-soft",
              ].join(" ")}
              aria-pressed={active}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-2xl" aria-hidden>
                  {r.emoji}
                </div>

                <span
                  className={[
                    "shrink-0 inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium",
                    "border border-soft bg-card",
                    active ? "text-app" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {active ? "Picked ✓" : "Pick"}
                </span>
              </div>

              <div className="mt-3 font-semibold leading-snug">{r.title}</div>
            </button>
          );
        })}
      </div>

      {/* Gentle feedback card */}
      <div className="rounded-2xl border border-soft bg-card p-4">
        <p className="text-base font-semibold text-app">
          {pickedReward ? `Nice job. ⭐` : "Good work showing up. ⭐"}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {pickedReward
            ? `Today’s reward: ${pickedReward.emoji} ${pickedReward.title}.`
            : "Pick one gentle reward to keep the win."}
        </p>
      </div>

      {/* Navigation actions (clean + consistent sizing) */}
      <div className="grid grid-cols-2 gap-2">
        <BigButton variant="secondary" onClick={() => router.back()}>
          Back
        </BigButton>

        <BigButton variant="primary" onClick={() => router.push("/home")}>
          Done
        </BigButton>
      </div>
    </div>
  );
}
