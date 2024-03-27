"use client";

import { cc } from "@/lib/utilities";
import { LinkProps, default as NextLink } from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";

export function Link({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & LinkProps) {
  const activeSegment = useSelectedLayoutSegment();
  const thisSegment = props.href.toString().split("/").at(-1);

  return (
    <NextLink
      className={cc(
        "hover:opacity-75",
        activeSegment === thisSegment && "text-primary dark:text-indigo-400",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
