import ShellHeader from "@/components/shell/header";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/nav-menu";
import { cc } from "@/lib/utilities";
import { GlassesIcon, HomeIcon, RssIcon, UnplugIcon } from "lucide-react";
import React from "react";

const menuItems: {
  title: string;
  href: string;
  icon?: React.ReactElement;
  description: string;
}[] = [
  {
    title: "General",
    icon: <HomeIcon />,
    href: "/",
    description: "Configure general settings for vignettte.",
  },
  {
    title: "Organizer",
    icon: <GlassesIcon />,
    href: "/organizer",
    description: "Configure the organizer, which renames and sorts your media.",
  },
  {
    title: "Monitors",
    icon: <RssIcon />,
    href: "/monitors",
    description: "Configure quality gates and matching for indexer monitors.",
  },
  {
    title: "External Services",
    icon: <UnplugIcon />,
    href: "/external",
    description:
      "Configure external services like indexers and download clients.",
  },
];

export default function PreferencesLayout() {
  return (
    <ShellHeader className="p-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Preferences</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                {menuItems.map((item) => (
                  <ListItem
                    key={item.title}
                    href={`/preferences${item.href}`}
                    title={item.title}
                    icon={item.icon}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </ShellHeader>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactElement }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cc(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-700 dark:hover:text-neutral-300 focus:bg-neutral-50 dark:focus:bg-neutral-900 focus:text-neutral-700 dark:focus:text-neutral-300",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 font-medium leading-none">
            {icon && React.cloneElement(icon, { className: "w-4 h-4" })}
            {title}
          </div>
          <p className="font-normal line-clamp-2 text-sm leading-snug text-neutral-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
