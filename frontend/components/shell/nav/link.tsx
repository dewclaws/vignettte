import { cc } from "@/lib/utilities";
import { cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinkVariants = cva(
  "flex items-center gap-3 rounded-e-md px-6 py-2 transition-all font-medium hover:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        active: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface NavLinkProps extends LinkProps {
  children: string;
  highlight?: RegExp;
  className?: string;
  icon?: React.ReactElement;
}

const NavLink = ({
  className,
  highlight,
  icon,
  children,
  ...props
}: NavLinkProps) => {
  const currentPath = usePathname().split("#")[0].split("?")[0];

  if (highlight === undefined) highlight = new RegExp(props.href as string);
  const isActive = highlight.test(currentPath);

  let variant: "default" | "active";
  if (isActive) {
    variant = "active";
  } else {
    variant = "default";
  }

  return (
    <Link className={cc(navLinkVariants({ variant }), className)} {...props}>
      {icon && React.cloneElement(icon, { className: "w-6 h-6" })}
      {children}
    </Link>
  );
};

export { NavLink, navLinkVariants };
