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
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium " +
  "border transition-colors no-underline text-app " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20";


  const styles =
  variant === "primary"
    ? "bg-primary text-white border-transparent hover:brightness-[1.03]"
    : variant === "ghost"
    ? "bg-card border-soft text-app hover:bg-primary-soft"
    : "bg-card border-soft hover:bg-primary-soft";


  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
