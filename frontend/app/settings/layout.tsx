import { NavigationBar } from "@/components/ui/navigation/navigation-bar";
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
    icon?: React.ReactElement;
  }[] = [
    {
      name: "General",
      icon: <SlidersHorizontalIcon />,
    },
    {
      name: "Organizer",
      icon: <GlassesIcon />,
    },
    {
      name: "Monitors",
      icon: <RssIcon />,
    },
    {
      name: "External Services",
      icon: <UnplugIcon />,
    },
  ];

  return (
    <>
      <NavigationBar />
      <div className="grid lg:grid-cols-[250px_1fr] p-6 gap-6">
        <div className="space-y-4">
          <h4 className="text-2xl font-bold">Settings</h4>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.name}>
                <a
                  href={`/${section.name.toLowerCase()}`}
                  className="flex items-center space-x-2"
                >
                  {section.icon &&
                    React.cloneElement(section.icon, { className: "w-4 h-4" })}
                  <span>{section.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
