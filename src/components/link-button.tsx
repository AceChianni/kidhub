// /components/link-button.tsx

import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

export default function LinkButton({
  href,
  children,
  variant = "secondary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center " +
    "min-h-[44px] min-w-[44px] " +
    "rounded-full px-4 text-sm font-medium " +
    "border no-underline " +
    "transition-colors duration-150 " +
    "focus-ring";

  const styles =
    variant === "primary"
      ? "bg-primary text-[rgb(var(--text-on-primary))] border-transparent"
      : variant === "ghost"
      ? "bg-transparent border-transparent text-app hover:bg-primary-soft"
      : "bg-card border-soft text-app hover:bg-primary-soft";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}