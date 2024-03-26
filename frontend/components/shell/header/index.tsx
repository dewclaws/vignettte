import { cc } from "@/lib/utilities";
import React from "react";

export function ShellHeader({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <header
      className={cc(
        "flex items-center h-16 gap-2 font-semibold bg-card border-border border-b lg:border-s lg:rounded-bl-md",
        className,
      )}
    >
      {children}
    </header>
  );
}

export { ShellHeaderNavigation, type MenuItem } from "./navigation";
