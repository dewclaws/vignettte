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
        "flex items-center px-5 py-4 gap-2 border-b lg:border-s lg:rounded-bl-md font-semibold bg-card border-border",
        className,
      )}
    >
      {children}
    </header>
  );
}

export { ShellHeaderNavigation, type MenuItem } from "./navigation";
