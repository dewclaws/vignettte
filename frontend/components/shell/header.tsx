import React from "react";

export default function ShellHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <header className="flex items-center px-5 py-4 gap-3 border-b font-semibold text-lg bg-neutral-100/40 dark:bg-neutral-800/40 dark:border-neutral-800">
      {children}
    </header>
  );
}
