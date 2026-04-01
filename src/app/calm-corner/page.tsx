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

type ResetTool = {
  title: string;
  steps: string[];
  note?: string;
  tone?: Tone;
};

const TOOLSETS: Record<Mood, ResetTool[]> = {
  Upset: [
    {
      title: "Cold water reset",
      tone: "sky",
      steps: ["Sip cold water", "Hold cup with both hands", "Slow exhale 3 times"],
    },
    {
      title: "Squeeze + release",
      tone: "mint",
      steps: ["Squeeze hands tight (3 seconds)", "Release (3 seconds)", "Repeat 5 times"],
    },
    {
      title: "Name 5 things",
      tone: "lav",
      steps: ["5 things you see", "4 things you feel", "3 things you hear"],
    },
    {
      title: "Pillow press",
      tone: "rose",
      steps: ["Hold a pillow tight", "Press for 10 seconds", "Take 3 slow breaths"],
    },
  ],
  Overwhelmed: [
    {
      title: "Lower the noise",
      tone: "lav",
      steps: ["Turn lights down", "Reduce sound", "One small step only"],
    },
    {
      title: "Body pressure",
      tone: "mint",
      steps: ["Wrap in blanket", "Bear hug (10 seconds)", "Unclench jaw + shoulders"],
    },
    {
      title: "Break the task",
      tone: "sun",
      steps: ["Pick the first step", "Do it for 60 seconds", "Pause + check in"],
    },
    {
      title: "Quiet corner",
      tone: "rose",
      steps: ["Sit somewhere soft", "Look at one calm thing", "Take 3 slow breaths"],
    },
  ],
  Tired: [
    {
      title: "Micro rest",
      tone: "lav",
      steps: ["Sit down", "3 slow breaths", "Small sip of water"],
    },
    {
      title: "Gentle stretch",
      tone: "mint",
      steps: ["Shoulder rolls", "Neck side stretch", "Shake arms out"],
    },
    {
      title: "Fuel check",
      tone: "sun",
      steps: ["Snack if hungry", "Water if thirsty", "Bathroom if needed"],
    },
    {
      title: "Cozy reset",
      tone: "rose",
      steps: ["Get something soft", "Sit for one minute", "Rest your body"],
    },
  ],
  Wiggly: [
    {
      title: "Wall pushes",
      tone: "mint",
      steps: ["Hands on wall", "Push for 10 seconds", "Rest 5 seconds", "Repeat 3 times"],
    },
    {
      title: "Shake it out",
      tone: "sky",
      steps: ["Shake hands", "Shake legs", "Big stretch"],
    },
    {
      title: "Animal walk",
      tone: "sun",
      steps: ["Bear walk 10 steps", "Crab walk 10 steps", "Stop + breathe"],
    },
    {
      title: "Jump count",
      tone: "lav",
      steps: ["Do 10 jumps", "Pause", "Take 2 slow breaths"],
    },
  ],
  Sad: [
    {
      title: "Comfort object",
      tone: "rose",
      steps: ["Pick a soft thing", "Hold it close", "Slow exhale 3 times"],
    },
    {
      title: "Tiny kindness",
      tone: "lav",
      steps: ["Pick one small comfort", "Do it now", "Say “that helped a little”"],
    },
    {
      title: "Music reset",
      tone: "sky",
      steps: ["One calm song", "Sit together", "Breathe with the beat"],
    },
    {
      title: "Warm drink pause",
      tone: "sun",
      steps: ["Hold a warm drink or cup", "Take one sip", "Rest for a moment"],
    },
  ],
  Anxious: [
    {
      title: "Breathe with fingers",
      tone: "sky",
      steps: ["Trace 5 fingers slowly", "Inhale up, exhale down", "Repeat once"],
    },
    {
      title: "Feet on the floor",
      tone: "lav",
      steps: ["Press feet down", "Feel toes + heels", "Slow exhale 3 times"],
    },
    {
      title: "Worry to words",
      tone: "sun",
      steps: ["Name the worry", "Name 1 safe thing", "Pick 1 tiny next step"],
    },
    {
      title: "Hand on heart",
      tone: "rose",
      steps: ["Put hand on chest", "Breathe in slowly", "Say “I am safe right now”"],
    },
  ],
};

type ParentScript = {
  title: string;
  lines: string[];
  tip?: string;
};

const PARENT_SCRIPTS: Record<Mood, ParentScript> = {
  Overwhelmed: {
    title: "When it’s too much",
    lines: [
      "I see it’s a lot right now.",
      "You’re safe.",
      "We’re going to do one small step together.",
      "You’re not in trouble.",
    ],
    tip: "Lower input: lights down, fewer words, one step only.",
  },
  Upset: {
    title: "When feelings are big",
    lines: [
      "I see you’re really upset.",
      "You’re safe with me.",
      "It’s okay to feel this.",
      "Let’s do one small reset together.",
    ],
    tip: "Keep your voice low + steady. Name the feeling, not the behavior.",
  },
  Tired: {
    title: "When energy is low",
    lines: [
      "Your body looks tired.",
      "You’re safe.",
      "We can slow down.",
      "Let’s do one small thing, then rest.",
    ],
    tip: "Offer water/snack/bathroom first—basic needs check.",
  },
  Wiggly: {
    title: "When the body needs movement",
    lines: [
      "Your body needs to move right now.",
      "That’s okay.",
      "Let’s do a safe movement reset.",
      "Then we’ll try the next step.",
    ],
    tip: "Give a “yes”: push, jump, wall press—then transition.",
  },
  Sad: {
    title: "When it feels heavy",
    lines: [
      "I see you’re feeling sad.",
      "You’re safe.",
      "I’m here with you.",
      "We can do something small and soft.",
    ],
    tip: "Connection first: sit close, comfort object, gentle tone.",
  },
  Anxious: {
    title: "When worry takes over",
    lines: [
      "That worry feels big right now.",
      "You’re safe.",
      "We can help your body feel calmer.",
      "One tiny step is enough.",
    ],
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

  const [mood, setMood] = useState<Mood | null>(null);
  const [activeTool, setActiveTool] = useState<number | null>(null);
  const [lastMood, setLastMood] = useState<{ mood: string; ts: number } | null>(null);
  const [didSaveSelection, setDidSaveSelection] = useState(false);

  useEffect(() => {
    if (mode === "parent") {
      setLastMood(getLastMood());
    }
  }, [mode]);

  const tools = useMemo(() => (mood ? TOOLSETS[mood] : []), [mood]);

  const selectedMoodMeta = useMemo(
    () => MOODS.find((m) => m.id === mood) ?? null,
    [mood]
  );

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

  const clearSelections = () => {
    setMood(null);
    setActiveTool(null);
    setDidSaveSelection(false);
  };

  const handleMoodToggle = (nextMood: Mood) => {
    setDidSaveSelection(false);
    setActiveTool(null);
    setMood((prev) => (prev === nextMood ? null : nextMood));
  };

  const handleToolToggle = (idx: number) => {
    setDidSaveSelection(false);
    setActiveTool((prev) => (prev === idx ? null : idx));
  };

  const confirmResetChoice = () => {
    if (!mood) return;
    saveLastMood(mood);
    appendMoodLog(mood);
    setLastMood({ mood, ts: Date.now() });
    setDidSaveSelection(true);
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

  const titleSubtitle =
    mode === "parent"
      ? { title: "Calm Corner", subtitle: "Support your child calmly." }
      : { title: "Calm Corner", subtitle: "Pick a feeling. Choose one small reset." };

  return (
    <div className="space-y-6 pb-6">
      <ScreenTitle title={titleSubtitle.title} subtitle={titleSubtitle.subtitle} />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("kid")}
          className={[
            "flex-1 rounded-full px-3 py-2 text-sm font-medium focus-ring transition-colors",
            mode === "kid" ? "bg-primary-soft" : "bg-card",
          ].join(" ")}
          aria-pressed={mode === "kid"}
        >
          Kid Tools
        </button>

        <button
          type="button"
          onClick={() => setMode("parent")}
          className={[
            "flex-1 rounded-full px-3 py-2 text-sm font-medium focus-ring transition-colors",
            mode === "parent" ? "bg-primary-soft" : "bg-card",
          ].join(" ")}
          aria-pressed={mode === "parent"}
        >
          Parent View
        </button>
      </div>

      {mode === "kid" && (
        <div className="space-y-6">
          <section aria-labelledby="mood-picker" className="space-y-3">
            <h2 id="mood-picker" className="sr-only">
              Choose a feeling
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {MOODS.map((m) => {
                const active = m.id === mood;

                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMoodToggle(m.id)}
                    className={[
                      "rounded-2xl p-4 text-center focus-ring transition-all",
                      toneBg[m.tone],
                      active
                        ? "ring-2 ring-black/10 scale-[0.98]"
                        : "hover:brightness-[1.02]",
                    ].join(" ")}
                    aria-pressed={active}
                    aria-label={`${m.id}. ${m.helper}${active ? ". Selected." : ""}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card">
                        <span className="text-xl" aria-hidden>
                          {m.emoji}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-app">{m.id}</div>
                      <div className="text-xs leading-snug text-muted-foreground">
                        {m.helper}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {(mood || activeTool !== null) && (
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={clearSelections}
                  className="text-sm text-muted-foreground underline underline-offset-4 focus-ring rounded-md px-2 py-1"
                >
                  Change feeling
                </button>
              </div>
            )}
          </section>

          {mood && (
            <section aria-labelledby="reset-tools" className="space-y-4 pt-2">
              <div className="space-y-1 text-center">
                <h2 id="reset-tools" className="text-sm font-semibold text-app">
                  Try one small reset
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose what feels most helpful right now.
                </p>
                <p className="text-xs text-muted-foreground">
                  You can change your mind anytime.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {tools.map((t, idx) => {
                  const active = idx === activeTool;
                  const chipTone: Tone = t.tone ?? selectedMoodMeta?.tone ?? "sky";

                  return (
                    <button
                      key={t.title}
                      type="button"
                      onClick={() => handleToolToggle(idx)}
                      className={[
                        "rounded-xl p-3 text-left focus-ring transition-all bg-card",
                        active ? "ring-2 ring-black/10 bg-primary-soft" : "hover:bg-primary-soft",
                      ].join(" ")}
                      aria-pressed={active}
                    >
                      <div className={["text-sm font-semibold leading-snug", toneText[chipTone]].join(" ")}>
                        {t.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {activeTool !== null && (
                <div className="rounded-2xl bg-primary-soft p-4 text-center shadow-sm">
                  <p className="font-semibold text-app">{tools[activeTool]?.title}</p>

                  <ol className="mt-3 space-y-2 text-left text-sm text-muted-foreground">
                    {tools[activeTool]?.steps.map((s) => (
                      <li key={s} className="ml-5 list-decimal">
                        {s}
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <BigButton variant="secondary" onClick={clearSelections}>
                      New choices
                    </BigButton>

                    <BigButton variant="primary" onClick={confirmResetChoice}>
                      Use this technique
                    </BigButton>
                  </div>

                  {didSaveSelection && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Saved for parent view.
                    </p>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {mode === "parent" && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{KID_NAME} last logged mood</p>

            <div className="mt-2 flex justify-center">
              {parentMoodMeta ? (
                <div
                  className={[
                    "inline-flex items-center gap-3 rounded-full px-5 py-3",
                    toneBg[parentMoodMeta.tone],
                  ].join(" ")}
                >
                  <span className="text-xl" aria-hidden>
                    {parentMoodMeta.emoji}
                  </span>
                  <span className="text-base font-semibold text-app">
                    {parentMoodMeta.id}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center rounded-full bg-card px-5 py-3 text-sm text-muted-foreground">
                  No mood yet
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-primary-soft p-4 text-center">
            <p className="text-sm text-app">
              Stay calm, reduce input, and guide one step at a time.
            </p>
          </div>

          {parentScript ? (
            <>
              <div className="space-y-2">
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

              <button type="button" onClick={copyScript} className="btn-secondary w-full">
                Copy script
              </button>

              {parentScript.tip && (
                <div className="rounded-2xl bg-card p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-app">
                    Parent Tip
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {parentScript.tip}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl bg-card p-4 text-center">
              <p className="text-sm font-semibold text-app">No mood yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Ask your kid to pick a feeling and confirm a reset first.
              </p>
            </div>
          )}

          <div className="rounded-2xl bg-card p-4">
            <p className="text-center text-sm font-semibold text-app">
              Coming soon: Parent dashboard
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Mood chart (last 7 days)</li>
              <li>• Most common mood + time of day</li>
              <li>• Average routine time</li>
              <li>• Most chosen reward</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}