import { cva, type VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLink = cva(
  "relative h-full items-center shrink-0 tracking-tight transition-all",
  {
    variants: {
      status: {
        default: "text-header-foreground hover:text-header-active",
        active:
          "text-header-active shadow-header-active shadow-nav-link-active",
      },
      direction: {
        horizontal: "inline-flex px-md gap-md type-nav-link-horizontal",
        vertical:
          "flex flex-col justify-end px-lg pb-md w-nav-base type-nav-link-vertical",
      },
    },
  }
);

export type NavLinkVariantProps = VariantProps<typeof navLink>;
export interface LinkInfo {
  name: string;
  icon: React.ReactElement;
}
export interface NavLinkProps
  extends LinkProps,
    LinkInfo,
    NavLinkVariantProps {}

export default function NavLink({
  name,
  icon,
  direction,
  ...props
}: NavLinkProps) {
  const active = usePathname().startsWith(props.href.toString());

  return (
    <div
      className={navLink({
        status: active ? "active" : "default",
        direction,
      })}
    >
      <div className="h-full flex flex-col items-center justify-center self-stretch">
        {React.cloneElement(icon, {
          weight: active ? "fill" : "regular",
          className: "size-2xl",
        })}
      </div>
      <div className="tracking-tight">
        <Link {...props}>
          {name}
          <span className="absolute inset-0"></span>
        </Link>
      </div>
    </div>
  );
}
