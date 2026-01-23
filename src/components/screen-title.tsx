// /components/screen-title.tsx

export default function ScreenTitle({
  title,
  subtitle,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={["space-y-1", centered ? "text-center" : "text-left"].join(" ")}>
      <h1 className="text-2xl font-semibold leading-tight text-app">{title}</h1>

      {subtitle && (
        <p className="text-sm text-muted-foreground lowstim-readable">{subtitle}</p>
      )}
    </div>
  );
}
