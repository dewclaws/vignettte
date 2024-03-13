'use client';

import { cc } from "@/lib/utilities";
import { cva, type VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinkVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50",
  {
    variants: {
      variant: {
        default: "",
        active:
          "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface NavLinkProps extends LinkProps, VariantProps<typeof navLinkVariants> {
  children: string;
  highlight?: "strictlyActive" | "active";
  className?: string;
  icon?: React.ReactElement;
}

const NavLink = ({ className, variant, highlight, icon, children, ...props }: NavLinkProps) => {
  const currentPath = usePathname().split('#')[0].split('?')[0];
  const isStrictlyActive = currentPath.endsWith(props.href as string);
  const isActive = currentPath.includes(props.href as string);

  switch (highlight) {
    case "strictlyActive":
      if (isStrictlyActive) {
        variant = "active";
      }
      break;
    case "active" || undefined:
      if (isActive) {
        variant = "active";
      }
      break;
  }

  return (
    <Link className={cc(navLinkVariants({variant, className}))} {...props}>
      {icon && React.cloneElement(icon, { className: "w-6 h-6" })}
      {children}
    </Link>
  )
}

export { NavLink, navLinkVariants };

