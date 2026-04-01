// /components/screen-title.tsx

type ScreenTitleProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export default function ScreenTitle({
  title,
  subtitle,
  centered = false,
}: ScreenTitleProps) {
  return (
    <header
      className={[
        "space-y-2",
        centered ? "text-center" : "text-left",
      ].join(" ")}
    >
      <div className={centered ? "mx-auto max-w-[36ch]" : "max-w-[36ch]"}>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-app">
          {title}
        </h1>

        {subtitle && (
          <p
            className={[
              "mt-2 text-sm leading-relaxed text-muted-foreground lowstim-readable",
              centered ? "mx-auto" : "",
            ].join(" ")}
          >
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}