// /components/big-button.tsx
"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function BigButton({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center " +
    "min-h-[56px] w-full " +
    "rounded-xl px-4 py-3 font-semibold " +
    "transition-all duration-150 " +
    "focus-ring " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-primary text-[rgb(var(--text-on-primary))] shadow-sm"
      : "bg-card border border-soft text-app";

  return (
    <button
      type="button"
      className={`${base} ${styles} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}