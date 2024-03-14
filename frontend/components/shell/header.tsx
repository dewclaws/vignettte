import React from "react";
import { twMerge } from "tailwind-merge";

export default function ShellHeader({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <header
      className={twMerge(
        "flex items-center px-5 py-4 gap-3 border-b font-semibold text-lg bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800",
        className,
      )}
    >
      {children}
    </header>
  );
}
