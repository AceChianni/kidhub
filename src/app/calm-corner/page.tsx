// src/app/calm-corner/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import ScreenTitle from "@/components/screen-title";
import BigButton from "@/components/big-button";
import { appendMoodLog, getLastMood, saveLastMood } from "@/lib/kidlog";

type Tone = "sky" | "mint" | "sun" | "lav" | "rose";
type ViewMode = "kid" | "parent";
const KID_NAME = "Your Kid";

type Mood = "Upset" | "Overwhelmed" | "Tired" | "Wiggly" | "Sad" | "Anxious";

type MoodMeta = {
  id: Mood;
  emoji: string;
  tone: Tone;
  helper: string;
};

const MOODS: MoodMeta[] = [
  { id: "Overwhelmed", emoji: "🌪️", tone: "sky", helper: "Too much at once." },
  { id: "Upset", emoji: "🔥", tone: "sun", helper: "Big feelings are here." },
  { id: "Tired", emoji: "😴", tone: "lav", helper: "Low energy mode." },
  { id: "Wiggly", emoji: "🐒", tone: "mint", helper: "Need to move it out." },
  { id: "Sad", emoji: "🌧️", tone: "rose", helper: "Need comfort + softness." },
  { id: "Anxious", emoji: "😟", tone: "sky", helper: "Worried + tight body." },
];

type ResetTool = { title: string; steps: string[]; note?: string; tone?: Tone };

const TOOLSETS: Record<Mood, ResetTool[]> = {
  Upset: [
    { title: "Cold water reset", tone: "sky", steps: ["Sip cold water", "Hold cup with both hands", "Slow exhale 3 times"] },
    { title: "Squeeze + release", tone: "mint", steps: ["Squeeze hands tight (3 seconds)", "Release (3 seconds)", "Repeat 5 times"] },
    { title: "Name 5 things", tone: "lav", steps: ["5 things you see", "4 things you feel", "3 things you hear"] },
  ],
  Overwhelmed: [
    { title: "Lower the noise", tone: "lav", steps: ["Turn lights down", "Reduce sound", "One small step only"] },
    { title: "Body pressure", tone: "mint", steps: ["Wrap in blanket", "Bear hug (10 seconds)", "Unclench jaw + shoulders"] },
    { title: "Break the task", tone: "sun", steps: ["Pick the first step", "Do it for 60 seconds", "Pause + check in"] },
  ],
  Tired: [
    { title: "Micro rest", tone: "lav", steps: ["Sit down", "3 slow breaths", "Small sip of water"] },
    { title: "Gentle stretch", tone: "mint", steps: ["Shoulder rolls", "Neck side stretch", "Shake arms out"] },
    { title: "Fuel check", tone: "sun", steps: ["Snack if hungry", "Water if thirsty", "Bathroom if needed"] },
  ],
  Wiggly: [
    { title: "Wall pushes", tone: "mint", steps: ["Hands on wall", "Push for 10 seconds", "Rest 5 seconds", "Repeat 3 times"] },
    { title: "Shake it out", tone: "sky", steps: ["Shake hands", "Shake legs", "Big stretch"] },
    { title: "Animal walk", tone: "sun", steps: ["Bear walk 10 steps", "Crab walk 10 steps", "Stop + breathe"] },
  ],
  Sad: [
    { title: "Comfort object", tone: "rose", steps: ["Pick a soft thing", "Hold it close", "Slow exhale 3 times"] },
    { title: "Tiny kindness", tone: "lav", steps: ["Pick one small comfort", "Do it now", "Say “that helped a little”"] },
    { title: "Music reset", tone: "sky", steps: ["One calm song", "Sit together", "Breathe with the beat"] },
  ],
  Anxious: [
    { title: "Breathe with fingers", tone: "sky", steps: ["Trace 5 fingers slowly", "Inhale up, exhale down", "Repeat once"] },
    { title: "Feet on the floor", tone: "lav", steps: ["Press feet down", "Feel toes + heels", "Slow exhale 3 times"] },
    { title: "Worry to words", tone: "sun", steps: ["Name the worry", "Name 1 safe thing", "Pick 1 tiny next step"] },
  ],
};

type ParentScript = { title: string; lines: string[]; tip?: string };

const PARENT_SCRIPTS: Record<Mood, ParentScript> = {
  Overwhelmed: {
    title: "When it’s too much",
    lines: ["I see it’s a lot right now.", "You’re safe.", "We’re going to do one small step together.", "You’re not in trouble."],
    tip: "Lower input: lights down, fewer words, one step only.",
  },
  Upset: {
    title: "When feelings are big",
    lines: ["I see you’re really upset.", "You’re safe with me.", "It’s okay to feel this.", "Let’s do one small reset together."],
    tip: "Keep your voice low + steady. Name the feeling, not the behavior.",
  },
  Tired: {
    title: "When energy is low",
    lines: ["Your body looks tired.", "You’re safe.", "We can slow down.", "Let’s do one small thing, then rest."],
    tip: "Offer water/snack/bathroom first—basic needs check.",
  },
  Wiggly: {
    title: "When the body needs movement",
    lines: ["Your body needs to move right now.", "That’s okay.", "Let’s do a safe movement reset.", "Then we’ll try the next step."],
    tip: "Give a “yes”: push, jump, wall press—then transition.",
  },
  Sad: {
    title: "When it feels heavy",
    lines: ["I see you’re feeling sad.", "You’re safe.", "I’m here with you.", "We can do something small and soft."],
    tip: "Connection first: sit close, comfort object, gentle tone.",
  },
  Anxious: {
    title: "When worry takes over",
    lines: ["That worry feels big right now.", "You’re safe.", "We can help your body feel calmer.", "One tiny step is enough."],
    tip: "Grounding works: feet on floor + simple choices.",
  },
};

const toneBg: Record<Tone, string> = {
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  sun: "bg-sun-soft",
  lav: "bg-lav-soft",
  rose: "bg-rose-soft",
};

const toneText: Record<Tone, string> = {
  sky: "text-sky",
  mint: "text-mint",
  sun: "text-sun",
  lav: "text-lav",
  rose: "text-rose",
};

export default function CalmCornerPage() {
  const [mode, setMode] = useState<ViewMode>("kid");

  // Kid selection
  const [mood, setMood] = useState<Mood | null>(null);
  const tools = useMemo(() => (mood ? TOOLSETS[mood] : []), [mood]);
  const [activeTool, setActiveTool] = useState<number | null>(null);

  // Parent info (persisted)
  const [lastMood, setLastMood] = useState<{ mood: string; ts: number } | null>(null);

  useEffect(() => {
    if (mode === "parent") setLastMood(getLastMood());
  }, [mode]);

  const selectedMoodMeta = useMemo(() => MOODS.find((m) => m.id === mood) ?? null, [mood]);

  const parentMood = useMemo(() => {
    const candidate = lastMood?.mood;
    if (!candidate) return null;
    return MOODS.some((m) => m.id === candidate) ? (candidate as Mood) : null;
  }, [lastMood]);

  const parentMoodMeta = useMemo(() => {
    if (!parentMood) return null;
    return MOODS.find((m) => m.id === parentMood) ?? null;
  }, [parentMood]);

  const parentScript = useMemo(() => {
    if (!parentMood) return null;
    return PARENT_SCRIPTS[parentMood];
  }, [parentMood]);

  const clearMood = () => {
    setMood(null);
    setActiveTool(null);
  };

  const copyScript = async () => {
    if (!parentScript) return;
    const text = parentScript.lines.map((l) => `“${l}”`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  // ScreenTitle changes based on mode
  const titleSubtitle =
    mode === "parent"
      ? { title: "Calm Corner", subtitle: "" }
      : { title: "Calm Corner", subtitle: "Pick a feeling. Choose one small reset." };

  return (
    <div className="space-y-5">
      <ScreenTitle title={titleSubtitle.title} subtitle={titleSubtitle.subtitle} />

      {/* MODE SWITCH */}
      <div className="rounded-2xl border border-soft bg-card p-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("kid")}
            className={[
              "min-h-[44px] rounded-2xl border border-soft px-3 text-sm font-semibold",
              mode === "kid" ? "bg-primary-soft" : "bg-card hover:bg-primary-soft",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
            ].join(" ")}
            aria-pressed={mode === "kid"}
          >
            Kid Tools
          </button>

          <button
            type="button"
            onClick={() => setMode("parent")}
            className={[
              "min-h-[44px] rounded-2xl border border-soft px-3 text-sm font-semibold",
              mode === "parent" ? "bg-primary-soft" : "bg-card hover:bg-primary-soft",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
            ].join(" ")}
            aria-pressed={mode === "parent"}
          >
            Parent View
          </button>
        </div>
      </div>

      {/* ======================
          KID MODE
         ====================== */}
      {mode === "kid" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-soft bg-card p-3">
            <p className="mb-2 text-sm font-medium text-app text-center">How are we feeling?</p>

            <div className="grid grid-cols-2 gap-2">
              {MOODS.map((m) => {
                const selected = m.id === mood;

                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setMood(m.id);
                      setActiveTool(null);

                      saveLastMood(m.id);
                      appendMoodLog(m.id);
                      setLastMood({ mood: m.id, ts: Date.now() });
                    }}
                    className={[
                      "rounded-2xl border border-soft px-3 py-3 min-h-[90px]",
                      "text-center transition-transform duration-150 active:scale-[0.99]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                      toneBg[m.tone],
                      selected ? "ring-2 ring-black/15" : "hover:brightness-[1.01]",
                    ].join(" ")}
                    aria-pressed={selected}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-card">
                        <span className="text-xl" aria-hidden>
                          {m.emoji}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-app">{m.id}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{m.helper}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {mood && (
              <div className="mt-3">
                <BigButton variant="secondary" onClick={clearMood}>
                  Reset feeling
                </BigButton>
              </div>
            )}
          </div>

          {mood && (
            <div className="rounded-2xl border border-soft bg-card p-3">
              <p className="mb-2 text-sm font-medium text-center">
                Quick resets for{" "}
                <span className={selectedMoodMeta ? toneText[selectedMoodMeta.tone] : ""}>
                  {selectedMoodMeta?.id}
                </span>
              </p>

              <div className="grid grid-cols-3 gap-2">
                {tools.map((t, idx) => {
                  const selected = idx === activeTool;
                  const chipTone: Tone = t.tone ?? selectedMoodMeta?.tone ?? "sky";

                  return (
                    <button
                      key={t.title}
                      type="button"
                      onClick={() => setActiveTool(idx)}
                      className={[
                        "rounded-2xl border border-soft px-2 py-3 min-h-[74px]",
                        "text-center transition-transform duration-150 active:scale-[0.99]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                        toneBg[chipTone],
                        selected ? "ring-2 ring-black/15" : "hover:brightness-[1.01]",
                      ].join(" ")}
                      aria-pressed={selected}
                    >
                      <div className={["text-xs font-semibold leading-snug", toneText[chipTone]].join(" ")}>
                        {t.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {activeTool !== null && (
                <div className="mt-3 rounded-2xl border border-soft bg-card p-3">
                  <p className="text-sm font-semibold text-center">{tools[activeTool]?.title}</p>

                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    {tools[activeTool]?.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>

                  <div className="mt-3">
                    <BigButton variant="secondary" onClick={() => setActiveTool(null)}>
                      Reset choices
                    </BigButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================
          PARENT MODE
         ====================== */}
      {mode === "parent" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-soft bg-card p-4">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Parent Support</p>

              <p className="mt-3 text-sm font-semibold text-app">{KID_NAME} last logged mood:</p>

              {/* Mood glow pill  */}
              <div className="mt-3 flex justify-center">
  {parentMoodMeta ? (
    <div className={["inline-flex items-center gap-3 rounded-full px-6 py-3 shadow-sm", toneBg[parentMoodMeta.tone]].join(" ")}>
      <span className="text-xl" aria-hidden>
        {parentMoodMeta.emoji}
      </span>
      <span className="text-base font-semibold text-app">
        {parentMoodMeta.id}
      </span>
    </div>
  ) : (
    <div className="inline-flex items-center rounded-full bg-card px-6 py-3 text-sm text-muted-foreground shadow-sm">
      No mood yet
    </div>
  )}
</div>

              <p className="mt-6 text-base font-extrabold text-app">What to say</p>

              {/* Parent Script */}
              <div className="mt-2 flex justify-center">
                <div
                  className={[
                    "inline-flex items-center rounded-full px-4 py-2",
                    "shadow-sm",
                    parentMoodMeta ? toneBg[parentMoodMeta.tone] : "bg-primary-soft",
                  ].join(" ")}
                >
                  <p className="text-sm text-app whitespace-nowrap">
                    Scripts to help your kid coregulate and feel safe:
                  </p>
                </div>
              </div>
            </div>

            {parentScript ? (
              <>
                <div className="mt-4 space-y-2">
                  {parentScript.lines.map((line) => (
                    <div
  key={line}
  className={[
    "rounded-2xl px-3 py-3 text-center",
    parentMoodMeta ? toneBg[parentMoodMeta.tone] : "bg-card",
  ].join(" ")}
>
  <p className="text-sm text-app">“{line}”</p>
</div>

                  ))}
                </div>

                {/* Small Copy Script button ABOVE Parent Tip */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={copyScript}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold",
                      "bg-primary-soft text-app shadow-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                    ].join(" ")}
                  >
                    Copy script
                  </button>
                </div>

                {/* Parent Tip (no black outline) */}
                {parentScript.tip && (
                  <div className="mt-4 rounded-2xl bg-primary-soft p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-app text-center">Parent Tip</p>
                    <p className="mt-1 text-sm text-muted-foreground text-center">{parentScript.tip}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-4 rounded-2xl bg-card p-4 text-center shadow-sm">
                <p className="text-sm font-semibold text-app">No mood yet</p>
                <p className="mt-1 text-sm text-muted-foreground">Ask your kid to pick a feeling in Kid Tools first.</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-soft bg-card p-4">
            <p className="text-sm font-semibold text-center">Coming soon: Parent dashboard</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>Mood chart (last 7 days)</li>
              <li>Most common mood + time of day</li>
              <li>Average routine time</li>
              <li>Most chosen reward</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
