// /app/rewards/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ScreenTitle from "@/components/screen-title";
import BigButton from "@/components/big-button";

const REWARDS = [
  { id: "r1", title: "Sticker or stamp", emoji: "🏷️" },
  { id: "r2", title: "5 minutes of choice time", emoji: "🎮" },
  { id: "r3", title: "Snack or treat", emoji: "🍓" },
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

  const toggleReward = (id: string) => {
    setPicked((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto w-full max-w-[380px] space-y-5 pb-6">
      <ScreenTitle
        title="Rewards"
        subtitle="Celebrate effort. Keep it gentle."
      />

      <div className="sr-only" aria-live="polite">
        {pickedReward
          ? `Reward selected: ${pickedReward.title}`
          : "No reward selected"}
      </div>

      <section aria-labelledby="reward-options" className="space-y-3">
        <h2 id="reward-options" className="sr-only">
          Reward options
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {REWARDS.map((r) => {
            const active = picked === r.id;

            return (
              <button
                key={r.id}
                type="button"
                onClick={() => toggleReward(r.id)}
                aria-pressed={active}
                aria-label={`${r.title}${
                  active ? ", selected. Press again to deselect." : ""
                }`}
                className={[
                  "tile tile-tone w-full min-h-[96px] p-3 text-left",
                  "focus-ring transition-colors",
                  active
                    ? "bg-primary-soft border-soft shadow-sm"
                    : "bg-card",
                ].join(" ")}
              >
                <div className="flex h-full flex-col justify-center gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={[
                        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-base",
                        active ? "bg-card shadow-sm" : "bg-card-strong",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {r.emoji}
                    </span>

                    <span
                      className={[
                        "rounded-full px-2 py-1 text-[10px] font-medium leading-none",
                        active
                          ? "bg-card text-app"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {active ? "Selected ✓" : "Choose"}
                    </span>
                  </div>

                  <div className="text-[14px] font-semibold leading-snug text-app">
                    {r.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="reward-feedback"
        className="rounded-2xl bg-success-soft p-4"
      >
        <h2
          id="reward-feedback"
          className="text-base font-semibold text-app"
        >
          {pickedReward ? "Nice job. ⭐" : "Good work showing up. ⭐"}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {pickedReward
            ? `You picked: ${pickedReward.emoji} ${pickedReward.title}.`
            : "Pick one gentle reward, or skip it if now is not the moment."}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <BigButton variant="secondary" onClick={() => router.back()}>
          Back
        </BigButton>

        <BigButton variant="primary" onClick={() => router.push("/")}>
          Done
        </BigButton>
      </div>
    </div>
  );
}