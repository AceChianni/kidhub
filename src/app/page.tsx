// /app/page.tsx
import ScreenTitle from "@/components/screen-title";
import CardLink from "@/components/card-link";

export default function HomePage() {
  return (
    <div className="space-y-5">
      <ScreenTitle
        title="What do we need today?"
        subtitle="Choose the kind of support you need right now."
        centered
      />

      <section aria-label="Support tools" className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <CardLink
            href="/routine/morning"
            title="Morning Routine"
            description="Gentle step-by-step start to the day"
            emoji="🌤️"
            tone="sun"
          />

          <CardLink
            href="/calm-corner"
            title="Calm Corner"
            description="Simple calming tools and guided support"
            emoji="😌"
            tone="mint"
          />

          <CardLink
            href="/routine/bedtime"
            title="Bedtime"
            description="Soft, predictable wind-down routine"
            emoji="🌙"
            tone="rose"
          />

          <CardLink
            href="/rewards"
            title="Rewards"
            description="Celebrate progress without pressure"
            emoji="⭐"
            tone="lav"
          />
        </div>
      </section>

      <section aria-labelledby="coming-soon" className="space-y-3">
        <h2
          id="coming-soon"
          className="text-sm font-medium text-muted-foreground"
        >
          Coming soon
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <CardLink
            href="/after-school"
            title="After School Reset"
            description="Unwind and transition after the day"
            emoji="🎒"
            disabled
            tone="sky"
          />

          <CardLink
            href="/weekend"
            title="Weekend Activity"
            description="Low-pressure ideas for unstructured time"
            emoji="🌻"
            disabled
            tone="sun"
          />
        </div>
      </section>
    </div>
  );
}