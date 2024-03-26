"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { ShellHeader } from ".";

export type TabItem = {
  name: string;
  content: React.ReactNode;
  icon?: React.ReactElement;
};

export function ShellHeaderTabbed({
  tabs,
  defaultTab,
}: Readonly<{
  tabs: TabItem[];
  defaultTab?: string;
}>) {
  return (
    <Tabs defaultValue={defaultTab ? defaultTab : tabs[0].name.toLowerCase()}>
      <ShellHeader className="p-2">
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
        <TabsContent key={tab.name} value={tab.name.toLowerCase()}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
