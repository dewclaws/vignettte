import { Link } from "@/components/ui/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/nav-menu";
import { NavigationBar } from "@/components/ui/navigation/navigation-bar";
import { cc } from "@/lib/utilities";
import {
  GlassesIcon,
  RssIcon,
  SlidersHorizontalIcon,
  UnplugIcon,
} from "lucide-react";
import React from "react";

export default function SettingsLayout({
  children,
  organizer,
  monitors,
  external_services,
}: Readonly<{
  children: React.ReactNode;
  organizer: React.ReactNode;
  monitors: React.ReactNode;
  external_services: React.ReactNode;
}>) {
  const sections: {
    name: string;
    description: string;
    icon?: React.ReactElement;
  }[] = [
    {
      name: "General",
      description: "Configure general settings for your instance.",
      icon: <SlidersHorizontalIcon />,
    },
    {
      name: "Organizer",
      description: "Configure how your media is organized.",
      icon: <GlassesIcon />,
    },
    {
      name: "Monitors",
      description: "Configure how new media is found.",
      icon: <RssIcon />,
    },
    {
      name: "External Services",
      description: "Configure connections to external applications.",
      icon: <UnplugIcon />,
    },
  ];

  return (
    <>
      <NavigationBar>
        <NavigationMenu className="lg:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base font-medium">
                Settings
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] md:w-[500px] gap-3 p-4 md:grid-cols-2">
                  {sections.map((section) => (
                    <li key={section.name}>
                      <NavigationMenuItem asChild>
                        <Link
                          href={`/settings/${section.name.toLowerCase().replaceAll(" ", "_")}`}
                          className={cc(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          )}
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none">
                            {section.icon &&
                              React.cloneElement(section.icon, {
                                className: "w-4 h-4",
                              })}
                            {section.name}
                          </div>
                          <p className="line-clamp-2 font-normal text-sm leading-snug text-muted-foreground">
                            {section.description}
                          </p>
                        </Link>
                      </NavigationMenuItem>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <span className="hidden lg:inline">Settings</span>
      </NavigationBar>
      <div className="h-full grid lg:grid-cols-[200px_1fr] p-6 gap-6">
        <div className="hidden lg:block border-e border-border">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.name}>
                <Link
                  href={`/settings/${section.name.toLowerCase().replaceAll(" ", "_")}`}
                  className="flex items-center space-x-2"
                >
                  {section.icon &&
                    React.cloneElement(section.icon, { className: "w-4 h-4" })}
                  <span>{section.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
