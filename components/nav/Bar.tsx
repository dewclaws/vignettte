import {
  NavAction,
  NavBranding,
  NavLink,
  NavLinkProps,
} from "@/components/nav";
import { Books, Gauge, Gear } from "@phosphor-icons/react";
import { VariantProps, cva } from "class-variance-authority";

const links: NavLinkProps[] = [
  {
    name: "Library",
    href: "/library",
    icon: <Books />,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Gauge />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Gear />,
  },
];

const navBar = cva(
  "shrink-0 justify-center w-full h-navbar bg-header-background text-header-foreground select-none",
  {
    variants: {
      position: {
        top: "hidden sm:flex",
        bottom: "flex sm:hidden",
      },
    },
  }
);

type NavBarProps = VariantProps<typeof navBar>;

export default function NavBar({
  position,
}: {
  position: NavBarProps["position"];
}) {
  return (
    <div className={navBar({ position })}>
      {position === "top" && (
        <div className="size-full max-w-screen-lg flex items-center justify-between">
          <NavBranding context="navbar" />
          <div className="size-full flex flex-1 items-center px-3xl gap-2xl">
            {links.map((link) => (
              <NavLink key={link.name} direction="horizontal" {...link} />
            ))}
          </div>
          <NavAction />
        </div>
      )}
      {position === "bottom" && (
        <div className="size-full flex items-center justify-between">
          <div className="size-full flex items-center justify-evenly px-3xl gap-2xl">
            {links.map((link) => (
              <NavLink key={link.name} direction="vertical" {...link} />
            ))}
          </div>
          <NavAction />
        </div>
      )}
    </div>
  );
}
