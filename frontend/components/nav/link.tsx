import { cc } from "@/lib/utilities"
import { cva } from "class-variance-authority"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const navLinkVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all font-medium hover:text-neutral-700 dark:hover:text-neutral-300",
  {
    variants: {
      variant: {
        default: "",
        active:
          "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface NavLinkProps extends LinkProps {
  children: string
  highlight?: RegExp
  className?: string
  icon?: React.ReactElement
}

const NavLink = ({
  className,
  highlight,
  icon,
  children,
  ...props
}: NavLinkProps) => {
  const currentPath = usePathname().split("#")[0].split("?")[0]

  if (highlight === undefined) highlight = new RegExp(props.href as string);
  const isActive = highlight.test(currentPath);

  let variant: "default" | "active";
  if (isActive) {
    variant = "active"
  } else {
    variant = "default"
  }

  return (
    <Link className={cc(navLinkVariants({ variant }), className)} {...props}>
      {icon && React.cloneElement(icon, { className: "w-6 h-6" })}
      {children}
    </Link>
  )
}

export { NavLink, navLinkVariants }
