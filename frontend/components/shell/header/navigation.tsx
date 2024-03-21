"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/nav-menu";
import { cc } from "@/lib/utilities";
import { SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { ShellHeader } from ".";

export type MenuItem = {
  title: string;
  href: string;
  icon?: React.ReactElement;
  description: string;
};

export function ShellHeaderNavigation({
  menuItems,
}: Readonly<{
  menuItems: MenuItem[];
}>) {
  const path = usePathname()
    .replace("/preferences", "")
    .split("/")
    .filter((segment) => segment !== "");
  const breadcrumb = menuItems.filter((item) =>
    path.some((segment) => item.href.includes(segment)),
  );

  return (
    <ShellHeader className="p-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cc(path.length > 0 && "font-normal")}
            >
              Preferences
            </NavigationMenuTrigger>
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
      {breadcrumb.length > 0 && (
        <>
          <SlashIcon
            strokeWidth={1}
            className="w-6 h-6 text-muted-foreground"
          />
          <Breadcrumb>
            <BreadcrumbList className="capitalize">
              {breadcrumb.map((segment, index) => (
                <BreadcrumbItem key={index}>
                  {segment.href === `/${path[index]}` ? (
                    <BreadcrumbPage className="flex items-center gap-1">
                      {segment.icon &&
                        React.cloneElement(segment.icon, {
                          className: "w-4 h-4",
                        })}
                      {segment.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={segment.href}>
                      {segment.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </>
      )}
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
            "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 font-medium leading-none">
            {icon && React.cloneElement(icon, { className: "w-4 h-4" })}
            {title}
          </div>
          <p className="font-normal line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
