// src/components/card-link.tsx
import Link from "next/link";

type Tone = "sky" | "mint" | "sun" | "lav" | "rose";

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

export default function CardLink({
  href,
  title,
  description,
  emoji,
  disabled,
  tone = "sky",
}: {
  href: string;
  title: string;
  description: string;
  emoji: string;
  disabled?: boolean;
  tone?: Tone;
}) {
  const base =
  "min-h-[112px] rounded-2xl border border-soft p-4 shadow-sm no-underline " +
  "transition-transform transition-shadow duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 " +
  "hover:-translate-y-[1px] hover:shadow-md active:scale-[0.99]";


  const content = (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2">
        <span className={`text-2xl ${toneText[tone]}`} aria-hidden>
          {emoji}
        </span>
        <span className="font-semibold text-app">{title}</span>
      </div>

      <div className="mt-0.5 text-sm leading-snug text-muted-foreground">
        {description}
      </div>

      {disabled && (
        <div className="mt-1 text-xs text-muted-foreground">Coming soon</div>
      )}
    </div>
  );

  if (disabled) {
    return (
      <div className={`${base} opacity-70 ${toneBg[tone]}`}>
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className={`${base} ${toneBg[tone]}`}>
      {content}
    </Link>
  );
}
