// /app/page.tsx

import Link from "next/link";
import ScreenTitle from "@/components/screen-title";
import CardLink from "@/components/card-link";

export default function HomePage() {
  return (
    <div className="space-y-5">
      <ScreenTitle
        title="What do we need today?"
        subtitle="Pick a moment. Keep it simple."
      />

      <div className="grid grid-cols-2 gap-3">
        <CardLink href="/routine/morning" title="Morning Routine" description="Step-by-step checklist + timer" emoji="🌤️" tone="sun" />
<CardLink href="/after-school" title="After School Reset" description="A soft landing after the day" emoji="🎒" disabled tone="sky" />
<CardLink href="/calm-corner" title="Calm Corner" description="Quick resets + parent scripts" emoji="😌" tone="mint" />
<CardLink href="/rewards" title="Rewards" description="Gentle motivation, no shame" emoji="⭐" tone="lav" />
<CardLink
  href="/routine/bedtime"
  title="Bedtime"
  description="Wind down with calm steps"
  emoji="🌙"
  tone="rose"
/>


      </div>

      <div className="rounded-2xl border p-4 text-sm leading-relaxed">
        <p className="font-medium">Low stimulation support</p>
        <p className="mt-1 text-muted-foreground">
          Use the toggle in the top bar to reduce motion and visual intensity.
        </p>
        <p className="mt-3">
          <Link className="underline underline-offset-4" href="/routine/morning">
            Start with Morning Routine
          </Link>
        </p>
      </div>
    </div>
  );
}
