// /components/top-bar.tsx
"use client";

import LinkButton from "@/components/link-button";
import { useLowStim } from "@/components/low-stim-provider";

export default function TopBar() {
  const { lowStim, toggle } = useLowStim();

  return (
    <header className="sticky top-0 z-10 border-b border-soft bg-card/95">
      <div className="flex items-center justify-between gap-3 px-1 py-3">
        <LinkButton
          href="/"
          variant="ghost"
          className="min-h-[44px] rounded-full px-3 text-sm font-medium"
          aria-label="Go to home screen"
        >
          Parents &amp; Kids Hub
        </LinkButton>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={lowStim}
          aria-label={
            lowStim
              ? "Turn calm mode off"
              : "Turn calm mode on"
          }
          className={[
            "min-h-[44px] min-w-[44px] rounded-full border px-4 text-sm font-medium",
            "focus-ring border-soft",
            lowStim
              ? "bg-primary text-[rgb(var(--text-on-primary))]"
              : "bg-primary-soft text-app",
          ].join(" ")}
        >
          Calm Mode {lowStim ? "On" : "Off"}
        </button>
      </div>
    </header>
  );
}