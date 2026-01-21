// /app/calm-corner/page.tsx

"use client";

import { useMemo, useState } from "react";
import ScreenTitle from "@/components/screen-title";
import BigButton from "@/components/big-button";

type Mood = "Upset" | "Overwhelmed" | "Tired" | "Wiggly" | "Sad";

const MOODS: Mood[] = ["Upset", "Overwhelmed", "Tired", "Wiggly", "Sad"];

type ResetTool = { title: string; steps: string[]; note?: string };

const TOOLSETS: Record<Mood, ResetTool[]> = {
  Upset: [
    { title: "Cold water reset", steps: ["Sip cold water", "Hold cup with both hands", "Slow exhale 3 times"] },
    { title: "Squeeze + release", steps: ["Squeeze hands tight (3 seconds)", "Release (3 seconds)", "Repeat 5 times"] },
    { title: "Name 5 things", steps: ["5 things you see", "4 things you feel", "3 things you hear"] },
  ],
  Overwhelmed: [
    { title: "Lower the noise", steps: ["Turn lights down", "Reduce sound", "One small step only"] },
    { title: "Body pressure", steps: ["Wrap in blanket", "Bear hug (10 seconds)", "Unclench jaw + shoulders"] },
    { title: "Break the task", steps: ["Pick the first step", "Do it for 60 seconds", "Pause + check in"] },
  ],
  Tired: [
    { title: "Micro rest", steps: ["Sit down", "3 slow breaths", "Small sip of water"] },
    { title: "Gentle stretch", steps: ["Shoulder rolls", "Neck side stretch", "Shake arms out"] },
    { title: "Fuel check", steps: ["Snack if hungry", "Water if thirsty", "Bathroom if needed"] },
  ],
  Wiggly: [
    { title: "Wall pushes", steps: ["Hands on wall", "Push for 10 seconds", "Rest 5 seconds", "Repeat 3 times"] },
    { title: "Shake it out", steps: ["Shake hands", "Shake legs", "Big stretch"] },
    { title: "Animal walk", steps: ["Bear walk 10 steps", "Crab walk 10 steps", "Stop + breathe"] },
  ],
  Sad: [
    { title: "Comfort object", steps: ["Pick a soft thing", "Hold it close", "Slow exhale 3 times"] },
    { title: "Tiny kindness", steps: ["Pick one small comfort", "Do it now", "Say “that helped a little”"] },
    { title: "Music reset", steps: ["One calm song", "Sit together", "Breathe with the beat"] },
  ],
};

const PARENT_SCRIPT = [
  "I see you.",
  "We’re safe.",
  "We can do one small reset together.",
  "You’re not in trouble.",
];

export default function CalmCornerPage() {
  const [mood, setMood] = useState<Mood>("Overwhelmed");
  const tools = useMemo(() => TOOLSETS[mood], [mood]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      <ScreenTitle
        title="Calm Corner"
        subtitle="Pick a feeling. Choose one small reset."
      />

      <div className="rounded-2xl border p-3">
        <p className="mb-2 text-sm font-medium">How are we feeling?</p>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => {
            const selected = m === mood;
            return (
              <button
                key={m}
                className={[
                  "min-h-[44px] rounded-full border px-4 py-2 text-sm",
                  selected ? "bg-black text-white" : "bg-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                ].join(" ")}
                onClick={() => {
                  setMood(m);
                  setOpenIndex(0);
                }}
                aria-pressed={selected}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border p-3">
        <p className="mb-2 text-sm font-medium">Quick resets</p>
        <div className="space-y-2">
          {tools.map((t, idx) => {
            const open = openIndex === idx;
            return (
              <div key={t.title} className="rounded-xl border">
                <button
                  className="flex min-h-[56px] w-full items-center justify-between px-4 py-3 text-left"
                  onClick={() => setOpenIndex(open ? null : idx)}
                >
                  <span className="font-medium">{t.title}</span>
                  <span aria-hidden>{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground">
                    <ol className="list-decimal space-y-1 pl-4">
                      {t.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3">
          <BigButton variant="secondary" onClick={() => setOpenIndex(0)}>
            Reset choices
          </BigButton>
        </div>
      </div>

      <div className="rounded-2xl border p-4">
        <p className="text-sm font-medium">Supportive parent script</p>
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          {PARENT_SCRIPT.map((line) => (
            <p key={line}>“{line}”</p>
          ))}
        </div>
      </div>
    </div>
  );
}
