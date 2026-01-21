"use client";

export default function BigButton({
  children,
  onClick,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  const base =
  "min-h-[56px] w-full rounded-xl px-4 py-3 font-medium transition-transform transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]";

  const styles =
  variant === "primary"
    ? "bg-primary text-white shadow-sm hover:brightness-[1.03] hover:-translate-y-[1px]"
    : "border border-soft bg-card text-app hover:bg-primary-soft hover:-translate-y-[1px]";



  return (
    <button
      type="button"
      className={`${base} ${styles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
