"use client";

import Link from "next/link";
import { useLowStim } from "@/components/low-stim-provider";

export default function TopBar() {
  const { lowStim, toggle } = useLowStim();

  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          Parents & Kids Hub
        </Link>

        <button
          onClick={toggle}
          className={[
            "min-h-[40px] rounded-full border px-3 text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
            lowStim ? "bg-black text-white" : "bg-white",
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
