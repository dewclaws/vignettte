import { ShellHeader } from "@/components/shell/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const tabs: {
    name: string;
    slot: React.ReactNode;
    icon?: React.ReactElement;
  }[] = [
    {
      name: "General",
      icon: <SlidersHorizontalIcon />,
      slot: children,
    },
    {
      name: "Organizer",
      icon: <GlassesIcon />,
      slot: organizer,
    },
    {
      name: "Monitors",
      icon: <RssIcon />,
      slot: monitors,
    },
    {
      name: "External Services",
      icon: <UnplugIcon />,
      slot: external_services,
    },
  ];

  return (
    <>
      <Tabs defaultValue={tabs[0].name.toLowerCase()}>
        <ShellHeader className="h-16 gap-4">
          Settings
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.name.toLowerCase()}
                className="flex items-center gap-1"
              >
                {tab.icon &&
                  React.cloneElement(tab.icon, { className: "w-4 h-4" })}
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </ShellHeader>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.name}
            value={tab.name.toLowerCase()}
            className="p-4"
          >
            {tab.slot}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
