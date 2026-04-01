// /components/card-link.tsx
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

type CardLinkProps = {
  href: string;
  title: string;
  description: string;
  emoji: string;
  disabled?: boolean;
  tone?: Tone;
};

export default function CardLink({
  href,
  title,
  description,
  emoji,
  disabled = false,
  tone = "sky",
}: CardLinkProps) {
  const base =
    "tile tile-tone min-h-[132px] overflow-hidden p-3.5 no-underline text-left";

  const enabledStyles = `${toneBg[tone]} tile-interactive focus-ring`;
  const disabledStyles = `${toneBg[tone]} tile-disabled`;

  const content = (
    <div className="flex h-full min-h-0 flex-col justify-between overflow-hidden">
      <div className="min-h-0 space-y-2 overflow-hidden">
        <span
          className={[
            "inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-card-strong text-base leading-none",
            toneText[tone],
          ].join(" ")}
          aria-hidden="true"
        >
          {emoji}
        </span>

        <div className="min-h-0 space-y-1 overflow-hidden">
          <h3 className="overflow-hidden break-words text-[15px] font-semibold leading-snug text-app">
            {title}
          </h3>

          <p className="overflow-hidden break-words text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {disabled && (
        <p className="coming-soon mt-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          Coming soon
        </p>
      )}
    </div>
  );

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        aria-label={`${title}. ${description}. Coming soon.`}
        className={`${base} ${disabledStyles}`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={`${title}. ${description}`}
      className={`${base} ${enabledStyles}`}
    >
      {content}
    </Link>
  );
}