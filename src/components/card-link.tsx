// /coomponents/card-link.tsx

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
  "min-h-[112px] rounded-2xl border border-soft p-4 text-left shadow-sm transition-transform transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 hover:-translate-y-[1px] hover:shadow-md active:scale-[0.99]";


  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={`inline-flex items-center gap-2 ${toneText[tone]}`}>
            <span className="text-2xl" aria-hidden>
              {emoji}
            </span>
            <span className="font-semibold">{title}</span>
          </div>
<div className="mt-1 text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
      {disabled && <div className="mt-2 text-xs text-muted-foreground">Coming soon</div>}

    </>
  );

  if (disabled) {
    return <div className={`min-h-[112px] rounded-2xl border border-soft p-4 text-left shadow-sm opacity-70 ${toneBg[tone]}`}>{content}</div>;

  }

  return (
    <Link href={href} className={`${base} ${toneBg[tone]}`}>
      {content}
    </Link>
  );
}
