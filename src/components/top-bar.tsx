// /components/top-bar.tsx
"use client";

import LinkButton from "@/components/link-button";
import { useLowStim } from "@/components/low-stim-provider";

export default function TopBar() {
  const { lowStim, toggle } = useLowStim();

  return (
<header className="sticky top-0 z-10 border-b border-soft bg-card/95 backdrop-blur">

      <div className="flex items-center justify-between px-4 py-3">
        <LinkButton href="/" variant="ghost" className="px-3">
  Parents & Kids Hub
</LinkButton>

        <button
          onClick={toggle}
          className={[
            "min-h-[40px] rounded-full border px-3 text-sm transition-colors",
            "border-soft",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
            lowStim ? "bg-primary text-white" : "bg-primary-soft text-app",
          ].join(" ")}
          aria-pressed={lowStim}
          aria-label="Toggle low stimulation mode"
        >
          Low Stim {lowStim ? "On" : "Off"}
        </button>

        
      </div>
    </header>
  );
}
