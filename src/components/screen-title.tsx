// /components/screen-title

export default function ScreenTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
